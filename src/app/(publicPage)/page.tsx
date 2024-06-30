import React from 'react';
import ButtonComponent from "@/app/Components/Shared/ButtonCompoent";

const homePage = () => {
    return (
          <div className="container mx-auto">
              <h1>Hello word</h1>
              <ButtonComponent
                  className="bg-blue-500 text-white btn">
                  Submit
              </ButtonComponent>
        </div>
    );
}
export default homePage;