'use client'
import { useGradient } from '@/app/context/GradientContext';

const CodeStackLayout = ({ children }) => {
  const { gradientStyle } = useGradient();

  return (
    <>
      <div className="w-full"> 
        <div className="w-full py-10">
          <div className="container-fluid">
            <div className="device-frame relative flex flex-col justify-between w-full h-full bg-[#222831] border-5 border-[rgba(0,0,0,0.5)] rounded-[25px] overflow-hidden pb-15">
              <div className="device-head flex items-center justify-between px-4 h-7 bg-[rgba(0,0,0,0.5)] pb-1.25">
                <div className="flex items-center gap-3">
                  <h4 className="text-lg font-bold tracking-widest bg-clip-text text-transparent mb-0 text-center" style={gradientStyle}>Code Stack</h4>
                </div>
                <ul className="device-head-dots flex items-center justify-end gap-1"><li className="w-2 h-2 rounded-full bg-white/50 shrink-0"></li><li className="w-2 h-2 rounded-full bg-[rgba(255,255,255,0.5)] shrink-0"></li><li className="w-2 h-2 rounded-full bg-[rgba(255,255,255,0.5)] shrink-0"></li></ul>
              </div>
              <div className="w-full h-full overflow-y-auto">
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodeStackLayout;
