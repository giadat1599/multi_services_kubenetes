import React from 'react';
import { Link } from 'react-router-dom';

export default function OtherPage() {
  return (
    <div>
      This is the other OtherPage
      <Link to="/">Back to home</Link>
    </div>
  );
}
