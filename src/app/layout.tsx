import './globals.css';
import ToastProvider from '../components/ToastProvider';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </head>
            <body 
                style={{ margin: 0, padding: 0, fontFamily: 'system-ui, -apple-system, sans-serif' }}
                suppressHydrationWarning
            >
                {children}
                <ToastProvider />
            </body>
        </html>
    );
}
