import React from 'react';
import Navber from "@/app/Components/Common/Navbar/Navber";

const layout = ({children}:any) => {
    return (
        <div className="container mx-auto">
            <Navber/>
            {children}
        </div>
    );
};

export default layout;