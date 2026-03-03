'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './login.module.css';
import authService from '../../../services/authService';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("https://franchisemooncake.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();
    console.log("LOGIN RESPONSE:", data);

    // 👇 SỬA FIELD TOKEN THEO BACKEND
    const token = data.token || data.data?.token;

    if (!token) {
      alert("Login không trả token");
      return;
    }

    // ✅ LƯU TOKEN Ở ĐÂY
    localStorage.setItem("token", token);

    // Decode JWT để lấy role (hoặc gọi API /auth/me)
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const role = payload.role;
      
      console.log("USER ROLE:", role);

      // Redirect dựa trên role
      if (role === 'franchise_staff') {
        router.push("/store");
      } else if (role === 'kitchen_staff') {
        router.push("/kitchen");
      } else if (role === 'manager') {
        router.push("/manager");
      } else if (role === 'admin') {
        router.push("/manager"); // hoặc trang admin riêng nếu có
      } else {
        alert("Role không được hỗ trợ: " + role);
      }
    } catch (err) {
      console.error("Error decoding token:", err);
      router.push("/store"); // fallback
    }

  } catch (err) {
    console.error(err);
    alert("Login lỗi");
  }
};

  return (
    <div className={styles.container}>
      {/* Left Side */}
      <div className={styles.leftSide}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <Image
              src="/logo.png"
              alt="Mooncake Franchise"
              width={96}
              height={96}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div className={styles.logoText}>
            <h2>Mooncake Franchise</h2>
            <p>Mid-Autumn Delights</p>
          </div>
        </div>

        <div className={styles.content}>
          <h1 className={styles.title}>
            Hệ thống Quản lý<br />
            <span className={styles.highlight}>Bếp Trung Tâm</span>
          </h1>
          <p className={styles.description}>
            Quản lý đơn hàng, tồn kho, sản xuất và phân phối<br />
            cho toàn bộ chuỗi franchise của bạn một cách hiệu quả.
          </p>

          <div className={styles.stats}>
            <span className={styles.badge}>MT</span>
            <span className={styles.badge}>HT</span>
            <span className={styles.badge}>NL</span>
            <span className={styles.badge}>VP</span>
            <span className={styles.storeCount}>12+ cửa hàng đang sử dụng</span>
          </div>
        </div>

        <div className={styles.footer}>
          © 2024 Mooncake Franchise. All rights reserved.
        </div>
      </div>

      {/* Right Side */}
      <div className={styles.rightSide}>
        <div className={styles.formContainer}>
          <h2 className={styles.formTitle}>Đăng nhập</h2>
          <p className={styles.formSubtitle}>
            Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục.
          </p>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && (
              <div className={styles.errorMessage}>
                {error}
              </div>
            )}

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email</label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>📧</span>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@company.com"
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <div className={styles.labelRow}>
                <label htmlFor="password" className={styles.label}>
                  Mật khẩu / Password
                </label>
                <a href="#" className={styles.forgotPassword}>
                  Quên mật khẩu?
                </a>
              </div>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon}>🔒</span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={styles.input}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.togglePassword}
                >
                  {showPassword ? '👁️' : '👁️'}
                </button>
              </div>
            </div>

            <div className={styles.rememberMe}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className={styles.checkbox}
              />
              <label htmlFor="remember" className={styles.checkboxLabel}>
                Ghi nhớ đăng nhập
              </label>
            </div>

            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>

            <div className={styles.support}>
              Cần hỗ trợ? Liên hệ<br />
              <a href="mailto:support@centralkitchen.vn">
                support@centralkitchen.vn
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
