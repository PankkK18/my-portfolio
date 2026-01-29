'use client';

import React from 'react';

export default function Header() {
  return (
    <header className="bg-black-800 p-4">
      <nav className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-semibold">
          Portfolio
        </div>

        <ul className="flex space-x-8">
          <li>
            <a
              href="#projects"
              className="text-white hover:text-gray-400 transition"
            >
              Projects
            </a>
          </li>

          <li>
            <a
              href="#skills"
              className="text-white hover:text-gray-400 transition"
            >
              Skills
            </a>
          </li>

          <li>
            <a
              href="#connect"
              className="text-white hover:text-gray-400 transition"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
