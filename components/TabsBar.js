import { useState, useEffect, useRef } from 'react';

const TabsBar = ({ items }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const firstBtnRef = useRef();

  useEffect(() => {
    firstBtnRef.current.focus();
  }, []);

  return (
    <div className="max-w-md flex flex-col gap-y-2 w-full">
      <div className="bg-gray-800 p-1 rounded-xl flex justify-between items-center gap-x-2 font-bold text-white">
        {items.map((item, index) => (
          <button
            ref={index === 0 ? firstBtnRef : null}
            key={index}
            onClick={() => setSelectedTab(index)}
            className={`outline-none w-full p-2 hover:bg-blue-300 rounded-xl text-center focus:ring-2 focus:bg-white focus:text-blue-600 ${
              selectedTab === index ? 'ring-2 bg-white text-blue-600' : ''
            } `}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="bg-white p-2 rounded-xl">
        {items.map((item, index) => (
          <div
            className={`${selectedTab === index ? '' : 'hidden'}`}
            key={index}
          >
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabsBar;
