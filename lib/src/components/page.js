import React from 'react';

function Page({ content }){
    return(
        <div className="w-[45%] h-full border-[1px] border-[solid] border-[#000] p-[10px] box-border">
            {content ? content : <div className="text-[#aaa] text-center pt-[50%]">This page is blank</div>}
        </div>
    );    
};

export default Page;

