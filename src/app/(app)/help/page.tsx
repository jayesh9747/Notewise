'use client';

import React from 'react';

export default function HelpPage() {
    return (
        <div className="pt-52 flex items-center justify-center bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6">
                <h1 className="text-2xl font-semibold mb-4 text-gray-800">Need Help?</h1>
                <p className="text-gray-600 mb-6">
                    If you have any questions or need assistance, feel free to reach out to me at:
                </p>
                <a
                    href="mailto:jayeshsavaliya0167@gmail.con"
                    className="inline-block bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-lg transition-colors"
                >
                    Email: jayeshsavaliya0167@gmail.con
                </a>
            </div>
        </div>
    );
}
