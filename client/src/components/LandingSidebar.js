import React from 'react'
import { FaHandPointRight } from 'react-icons/fa'
import { LuPcCase } from 'react-icons/lu'
import {useSelector} from 'react-redux'
import {language} from '../utils/part-1lan'
import { GrDocumentConfig } from 'react-icons/gr'
import { IoIosInformationCircle } from "react-icons/io";

function LandingSidebar() {
  const translationState = useSelector((state)=>state?.translation)
  return (
    <div className='w-[100%] min-h-[150px] bg-white fixed top-[150px] left-0 hidden max-sm1:block'>
        <div className='w-[80%] my-[50px] text-[#1C3F79] mx-auto flex flex-col gap-[20px]'>
            <div className='flex items-center gap-[10px] hover:underline'>
            <LuPcCase />
            <a href='/checkstatus'>
            {translationState?.lan === "En" &&
                          language?.checkCaseStatus[0]}
                        {translationState?.lan === "Am" &&
                          language?.checkCaseStatus[1]}
                          {translationState?.lan === "Or" &&
                          language?.checkCaseStatus[2]}  
                            {translationState?.lan === "Tg" &&
                          language?.checkCaseStatus[3]}
                            {translationState?.lan === "Sm" &&
                          language?.checkCaseStatus[4]}
                            {translationState?.lan === "Af" &&
                          language?.checkCaseStatus[5]}
            </a>
            </div> 
            <div className='flex items-center gap-[10px] hover:underline'>
            <FaHandPointRight />
            <a href='/makeaccusation'>
            {translationState?.lan === "En" &&
                          language?.makeAccusation[0]}
                        {translationState?.lan === "Am" &&
                          language?.makeAccusation[1]}
                               {translationState?.lan === "Or" &&
                          language?.makeAccusation[2]}
                               {translationState?.lan === "Tg" &&
                          language?.makeAccusation[3]}
                               {translationState?.lan === "Sm" &&
                          language?.makeAccusation[4]}
                               {translationState?.lan === "Af" &&
                          language?.makeAccusation[5]}
                          
                          </a>
            </div> 
            <div className='flex items-center gap-[10px] hover:underline'>
            <GrDocumentConfig  />
            <a href='/manual'>
            {translationState?.lan === "En" &&
                          language?.userManual[0]}
                        {translationState?.lan === "Am" &&
                          language?.userManual[1]}
                               {translationState?.lan === "Or" &&
                          language?.userManual[2]}
                               {translationState?.lan === "Tg" &&
                          language?.userManual[3]}
                               {translationState?.lan === "Sm" &&
                          language?.userManual[4]}
                               {translationState?.lan === "Af" &&
                          language?.userManual[5]}
                          
                          </a>
            </div> 
            <div className='flex items-center gap-[10px] hover:underline'>
            <IoIosInformationCircle />
            <a href="https://aahdab.org.et/" target="_blank" rel="noreferrer">
            {translationState?.lan === "En" &&
                          language?.forMoreInfo[0]}
                        {translationState?.lan === "Am" &&
                          language?.forMoreInfo[1]}
                               {translationState?.lan === "Or" &&
                          language?.forMoreInfo[2]}
                               {translationState?.lan === "Tg" &&
                          language?.forMoreInfo[3]}
                               {translationState?.lan === "Sm" &&
                          language?.forMoreInfo[4]}
                               {translationState?.lan === "Af" &&
                          language?.forMoreInfo[5]}
                          
                          </a>
            </div> 

        </div>
    </div>
  )
}

export default LandingSidebar