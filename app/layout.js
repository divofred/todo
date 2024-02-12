import './globals.css';
import { AuthProvider } from './Providers';
import { ApolloWrapper } from '@/lib/client'; //Importing the ApolloWrapper Provider

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ApolloWrapper>{children}</ApolloWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}