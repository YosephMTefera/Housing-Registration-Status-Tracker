import { CheckCircle2, SearchX } from "lucide-react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { languageTranslate } from "../../utils/data";

const ResultStates = ({ error, setError, lang, onReset, customerData }) => {
  const translateState = useSelector((state) => state.translation);

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full bg-[hsl(0,84%,98%)] border border-[hsl(0,84%,92%)] rounded-[2rem] p-6 sm2:p-10 text-center space-y-6 shadow-[0_8px_30px_rgba(220,38,38,0.05)]"
      >
        <div className="mx-auto w-16 h-16 sm2:w-24 sm2:h-24 bg-white rounded-full flex items-center justify-center shadow-sm border border-[hsl(0,84%,95%)]">
          <SearchX className="w-8 h-8 sm2:w-12 sm2:h-12 text-[hsl(0,84%,60%)]" />
        </div>
        <div className="space-y-3">
          <h2 className="text-xl sm2:text-2xl font-black text-[hsl(0,84%,20%)] leading-tight px-2">
            {languageTranslate(translateState?.lan, "noMatch")}
          </h2>
          <p className=" text-[hsl(0,84%,35%)] max-w-xs mx-auto leading-relaxed">
            {languageTranslate(translateState?.lan, "noMatchDesc")}
          </p>
        </div>
        <div className="pt-2 sm2:pt-4">
          <button
            onClick={() => {
              setError(false);
              onReset();
            }}
            className="w-full h-12 sm2:h-14 bg-[hsl(0,84%,45%)] hover:bg-[hsl(0,84%,40%)] text-white font-black rounded-xl transition-all flex items-center justify-center uppercase shadow-lg shadow-[hsl(0,84%,45%)/10]"
          >
            {languageTranslate(translateState?.lan, "tryDiffrentDetails")}
          </button>
        </div>
      </motion.div>
    );
  }

  if (customerData.length > 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="bg-[hsl(142,72%,98%)] border border-[hsl(142,72%,90%)] rounded-[2rem] p-5 sm2:p-8 text-center shadow-[0_8px_30px_rgba(21,128,61,0.05)]">
          <div className="mx-auto w-16 h-16 sm2:w-20 sm2:h-20 bg-white rounded-full flex items-center justify-center mb-6 border border-[hsl(142,72%,92%)] shadow-sm">
            <CheckCircle2
              className="w-8 h-8 sm2:w-10 sm2:h-10 text-[hsl(142,72%,29%)]"
              strokeWidth={1.5}
            />
          </div>

          <h2 className="text-xl sm2:text-2xl font-black text-[hsl(142,72%,15%)] mb-6 sm2:mb-8 tracking-tight px-2">
            {languageTranslate(translateState?.lan, "autoVerified")}
          </h2>

          <div className="space-y-12 text-left">
            {customerData?.map((record, mIdx) => (
              <div key={mIdx} className="space-y-4">
                {/* {customerData?.length > 1 && (
                  <div className="flex items-center gap-3 px-2">
                    <span className="text-[10px] font-black text-[#1B4075]/40 uppercase tracking-widest whitespace-nowrap">
                      {lang === "am"
                        ? `ቆጣቢ ${mIdx + 1}`
                        : `Applicant ${mIdx + 1}`}
                    </span>
                    <div className="h-px flex-1 bg-[#1B4075]/10" />
                  </div>
                )} */}

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm2:gap-6">
                  {customerData?.map((record, idx) => (
                    <div
                      key={record._id || idx}
                      className="bg-white rounded-3xl border border-[#1B4075]/10 shadow-sm overflow-hidden relative group transition-all hover:shadow-md hover:border-[#1B4075]/20"
                    >
                      {/* Container Brand Accents */}
                      <div className="absolute top-0 left-0 w-1.5 h-full bg-[#1B4075] opacity-20 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      <div className="absolute top-0 right-0 w-1.5 h-full bg-[#1B4075] opacity-20 group-hover:opacity-100 transition-opacity pointer-events-none" />

                      {/* Grid Content */}
                      <div className="p-6 sm2:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 sm2:gap-8">
                        {/* Bank Account - Full width on mobile grid row */}
                        <div className="md:col-span-3 pb-4 border-b border-[#1B4075]/5">
                          <p
                            className={`${
                              lang === "Am"
                                ? "text-[14px] sm2:text-[16px]"
                                : "text-[10px] sm2:text-[12px]"
                            } font-black text-[#1B4075]/60 mb-1.5 uppercase tracking-tight`}
                          >
                            {languageTranslate(
                              translateState?.lan,
                              "bankAccount"
                            )}
                          </p>
                          <p
                            className={`${
                              lang === "Am"
                                ? "text-2xl sm2:text-[16px]"
                                : "text-xl sm2:text-[16px]"
                            } font-black text-[#1B4075] leading-tight break-all tracking-tight`}
                          >
                            {record.bank_account}
                          </p>
                        </div>

                        {/* Full Name */}
                        <div>
                          <p
                            className={`${
                              lang === "Am"
                                ? "text-[14px] sm2:text-[16px]"
                                : "text-[10px] sm2:text-[12px]"
                            } font-black text-[#1B4075]/60 mb-1.5 uppercase tracking-tight`}
                          >
                            {languageTranslate(translateState?.lan, "fullname")}
                          </p>
                          <p
                            className={`${
                              lang === "Am"
                                ? "text-lg sm2:text-xl"
                                : "text-base sm2:text-lg"
                            } font-black text-[#1B4075] leading-tight break-words`}
                          >
                            {record.fullname}
                          </p>
                        </div>

                        {/* Gender */}
                        <div>
                          <p
                            className={`${
                              lang === "Am"
                                ? "text-[14px] sm2:text-[16px]"
                                : "text-[10px] sm2:text-[12px]"
                            } font-black text-[#1B4075]/60 mb-1.5 uppercase tracking-tight`}
                          >
                            {languageTranslate(translateState?.lan, "gender")}
                          </p>
                          <p
                            className={`${
                              lang === "Am"
                                ? "text-lg sm2:text-xl"
                                : "text-base sm2:text-lg"
                            } font-black text-[#1B4075] leading-tight`}
                          >
                            {record.gender}
                          </p>
                        </div>

                        {/* Program Type */}
                        <div>
                          <p
                            className={`${
                              lang === "Am"
                                ? "text-[14px] sm2:text-[16px]"
                                : "text-[10px] sm2:text-[12px]"
                            } font-black text-[#1B4075]/60 mb-1.5 uppercase tracking-tight`}
                          >
                            {languageTranslate(
                              translateState?.lan,
                              "programType"
                            )}
                          </p>
                          <p
                            className={`${
                              lang === "Am"
                                ? "text-lg sm2:text-xl"
                                : "text-base sm2:text-lg"
                            } font-black text-[#1B4075] leading-tight`}
                          >
                            {record.program_type}
                          </p>
                        </div>

                        {/* Bedroom */}
                        <div>
                          <p
                            className={`${
                              lang === "Am"
                                ? "text-[14px] sm2:text-[16px]"
                                : "text-[10px] sm2:text-[12px]"
                            } font-black text-[#1B4075]/60 mb-1.5 uppercase tracking-tight`}
                          >
                            {languageTranslate(translateState?.lan, "bedroom")}
                          </p>
                          <p
                            className={`${
                              lang === "Am"
                                ? "text-lg sm2:text-xl"
                                : "text-base sm2:text-lg"
                            } font-black text-[#1B4075] leading-tight`}
                          >
                            {record.bedroom}
                          </p>
                        </div>

                        {/* Status */}
                        <div>
                          <p
                            className={`${
                              lang === "Am"
                                ? "text-[14px] sm2:text-[16px]"
                                : "text-[10px] sm2:text-[12px]"
                            } font-black text-[#1B4075]/60 mb-1.5 uppercase tracking-tight`}
                          >
                            {languageTranslate(
                              translateState?.lan,
                              "applicantStatus"
                            )}
                          </p>
                          <p
                            className={`${
                              lang === "Am"
                                ? "text-lg sm2:text-xl"
                                : "text-base sm2:text-lg"
                            } font-black text-[#1B4075] leading-tight`}
                          >
                            {record.applicant_status}
                          </p>
                        </div>

                        {/* Job Status */}
                        <div>
                          <p
                            className={`${
                              lang === "Am"
                                ? "text-[14px] sm2:text-[16px]"
                                : "text-[10px] sm2:text-[12px]"
                            } font-black text-[#1B4075]/60 mb-1.5 uppercase tracking-tight`}
                          >
                            {languageTranslate(
                              translateState?.lan,
                              "jobStatus"
                            )}
                          </p>
                          <p
                            className={`${
                              lang === "Am"
                                ? "text-lg sm2:text-xl"
                                : "text-base sm2:text-lg"
                            } font-black text-[#1B4075] leading-tight`}
                          >
                            {record.job_status}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm2:mt-8">
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-white/50 to-transparent z-50 pb-8 sm2:pb-10">
              <div className="max-w-xl mx-auto">
                <button
                  onClick={onReset}
                  className="w-full h-12 sm2:h-14 bg-[#1B4075] hover:bg-[#132f56] text-white font-black rounded-xl transition-all duration-300 flex items-center justify-center  uppercase shadow-[0_20px_50px_rgba(27,64,117,0.3)] ring-4 ring-white/50 backdrop-blur-sm"
                >
                  {languageTranslate(translateState?.lan, "verifyRecord")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
};

export default ResultStates;
