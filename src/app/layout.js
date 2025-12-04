import './globals.css';

export const metadata = {
  title: 'Trust Community Fund',
  description: 'Your trusted financial partner.',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
