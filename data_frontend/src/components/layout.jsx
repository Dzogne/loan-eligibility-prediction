import Header from './header';
import Footer from './footer';
import Sidebar from './sidebar'

export default function layout({ children }) {
    return (
        <div className="min-h-screen flex flex-col ">
            <Header />
            <div className='flex'>
                <Sidebar />
                <main className="flex-1 bg-gray-100 min-h-screen">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
};