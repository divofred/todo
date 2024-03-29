'use client';
import { signIn } from 'next-auth/react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const IndexPage = () => {
  return (
    <div>
      <Link href="/api/auth/signin">
        <button
          onClick={e => {
            e.preventDefault();
            signIn('google', {
              callbackUrl: 'https://todo-nu-sand.vercel.app/todo'
            });
          }}
        >
          Sign In
        </button>
      </Link>
    </div>
  );
};

export default IndexPage;
