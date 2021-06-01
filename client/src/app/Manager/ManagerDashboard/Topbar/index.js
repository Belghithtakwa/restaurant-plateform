import React from "react";

const ManagerTopbar = () => {
  return (
    <div className="bg-red-400 flex justify-start items-center h-12">
      <div className=" w-16">test</div>
      <div className="flex flex-1 justify-between items-center px-8">
        <div className="text-sm">fdhgjkjqjdslkgjqlksfjgml qsjflgjqml</div>
        <div className=" flex gap-6 items-center">
          <div>
            <i class="fas fa-search"></i>
          </div>
          <div>
            <i class="fas fa-search"></i>
          </div>
          <div>
            <i class="fas fa-search"></i>
          </div>
          <div>
            <i class="fas fa-search"></i>
          </div>
          <div className="flex items-center gap-2">
                      <div className="bg-yellow-300 text-center my-auto rounded-full h-10 w-10">img</div>
                      <div>dropDown</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerTopbar;
