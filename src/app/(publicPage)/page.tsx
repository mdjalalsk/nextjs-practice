import React from 'react';
import ButtonComponent from "@/app/Components/Shared/ButtonCompoent";

const homePage = () => {
    return (
          <div className="container mx-auto">
              <h1>Hello word</h1>
              <ButtonComponent className={'text-white btn btn-primary'}>Add to cart</ButtonComponent>
        </div>
    );
}
export default homePage;