import React from 'react';

const DashboardFooter = () => {
    return (
        <footer className="bg-white text-dark text-center py-3 border-top" style={{marginTop:"auto"}}>
            <div className="container">
                <p className="mb-1">© {new Date().getFullYear()} Sales Track. All rights reserved.</p>
                <p>
                    <a href="/privacy-policy" className="text-dark mx-2">Privacy Policy</a> |
                    <a href="/terms" className="text-dark mx-2">Terms of Service</a>
                </p>
            </div>
        </footer>
    );
};

export default DashboardFooter;
