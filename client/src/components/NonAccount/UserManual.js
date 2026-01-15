import React from "react";
import Navbar from "../Navbar";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { language } from "../../utils/part-1lan";

const UserManual = () => {
  const navigate = useNavigate();
  const translationState = useSelector((state) => state.translation);
  return (
    <div className="w-full flex-col gap-2">
      <Navbar />

      <div className="w-[90%] mt-[130px] mx-auto">
        <div className="flex items-center gap-2 text-[30px] font-bold text-[#1C3F79] max-lg2:text-[24px]">
          <BiChevronLeft
            onClick={() => navigate(-1)}
            className="max-lg2:text-[20px] text-[40px] cursor-pointer"
          />
          {translationState?.lan === "En" && (
            <span className="text-[30px] font-bold text-[#1C3F79] max-lg2:text-[24px]">
              {language?.userManual[0]}
            </span>
          )}
          {translationState?.lan === "Am" && (
            <span className="text-[30px] font-bold text-[#1C3F79] max-lg2:text-[24px]">
              {language?.userManual[1]}
            </span>
          )}
          {translationState?.lan === "Or" && (
            <span className="text-[30px] font-bold text-[#1C3F79] max-lg2:text-[24px]">
              {language?.userManual[2]}
            </span>
          )}
          {translationState?.lan === "Tg" && (
            <span className="text-[30px] font-bold text-[#1C3F79] max-lg2:text-[24px]">
              {language?.userManual[3]}
            </span>
          )}
          {translationState?.lan === "Sm" && (
            <span className="text-[30px] font-bold text-[#1C3F79] max-lg2:text-[24px]">
              {language?.userManual[4]}
            </span>
          )}
          {translationState?.lan === "Af" && (
            <span className="text-[30px] font-bold text-[#1C3F79] max-lg2:text-[24px]">
              {language?.userManual[5]}
            </span>
          )}
        </div>
        <div className="my-[10px] bg-gray-300 h-[1px] w-full" />
        <div className='w-full flex justify-end items-center'>
        <a
    href={require("../../CAS/CUSTOMERLATEST.pdf")}
    download="CUSTOMERLATEST.pdf"
    className="inline-block text-[#1C3F79] hover:underline max-md1:text-[14px] max-sm1:text-[12px]"
  >
 {translationState?.lan === "En" &&
                      language?.downloadManual[0]}
                    {translationState?.lan === "Am" &&
                      language?.downloadManual[1]}
                    {translationState?.lan === "Or" &&
                      language?.downloadManual[2]}
                    {translationState?.lan === "Tg" &&
                      language?.downloadManual[3]}
                    {translationState?.lan === "Sm" &&
                      language?.downloadManual[4]}
                    {translationState?.lan === "Af" &&
                      language?.downloadManual[5]}
  </a>
        </div>
        <div className="w-[100%] my-4 overflow-y-scroll">
          <iframe
            src={require("../../CAS/CUSTOMERLATEST.pdf")}
            width={"100%"}
            height={"1000px"}
            title="manual"
            className="w-full h-[500px] sm:h-[700px] md:h-[900px] lg:h-[1000px] my-[20px]"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default UserManual;
