import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { useSelector } from "react-redux";
import ResultStates from "./ResultStates";
import { toast, ToastContainer } from "react-toastify";
import VerificationForm from "./VerificationForm";
import { languageTranslate } from "../../utils/data";
import apiRequest from "../../utils/request";
import ServerError from "../ServerError";
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 60 * 1000;
const Saving = () => {
  const translationState = useSelector((state) => state.translation);
  const [isLoading, setIsLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [lockUntil, setLockUntil] = useState(localStorage.getItem("lockTime"));
  const [customerData, setCustomerData] = useState([]);
  const [error,setError] = useState(false);
  const [success,setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    if (lockUntil && Date.now() >= lockUntil) {
      setLockUntil(null);
      setAttempts(0);
    }
  }, [lockUntil]);

  const handleVerify = async (data) => {
    if (lockUntil && Date.now() < lockUntil) return false;

    try {
      setIsLoading(true);
      await apiRequest
        .post(
          `/saving_info/saving_information`,
          {
            bank_account: data?.bank,
          },
          {
            headers: {
              GET_EXTEIGHTH_API: process.env.REACT_APP_GET_EXTEIGHTH_API,
            },
          }
        )
        .then((res) => {
          setSuccess(true)
          setError(false);
          setIsLoading(false);
          setCustomerData(res?.data);
          // setAttempts(5)
        })
        .catch((error) => {
              setSuccess(false)
          setIsLoading(false);
          setError(true)
          translationState?.lan === "En" &&
            toast.error(error?.response?.data?.Message_en);
          translationState?.lan === "Am" &&
            toast.error(error?.response?.data?.Message_am);
            setCustomerData([])
          const newAttempts = attempts + 1;
          setAttempts(newAttempts);

          if (newAttempts >= MAX_ATTEMPTS) {
            const lockTime = Date.now() + LOCKOUT_DURATION;
            setLockUntil(lockTime);
            localStorage.setItem("lockTime",lockTime);
            toast.error(
              languageTranslate(translationState?.lan, "securityLookout")
            );
     
          }
        });
    } catch {
      setServerError(true);
    }
  };

  const [searchKey, setSearchKey] = useState(0);

  const resetSearch = () => {
    setCustomerData([]);
    setSearchKey((prev) => prev + 1);
  };

  if (serverError) return <ServerError />;

  return (
    <div className="w-full">
      <ToastContainer theme="light" limit={2} />
      <Navbar />

      <div>
        <header className="bg-[rgb(255,255,255)]  pt-[32px] pb-[20px] px-[16px] flex flex-col items-center pr-[16px] pl-[16px] py-[20px]">
          <div className="text-center space-y-2 mt-[100px]">
            <h1 className="text-[32px] font-bold text-gray-900 leading-tight">
              {languageTranslate(translationState?.lan, "title")}
            </h1>
            <p className="text-gray-500 max-w-lg mx-auto text-[16px] leading-relaxed">
              {languageTranslate(translationState?.lan, "subtitle")}
            </p>
          </div>
        </header>
        <div className="w-full min-h-[80vh] bg-blue-50">
          <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="w-full col-span-2">
                <VerificationForm
                  key={searchKey}
                  setError={setError}
                  error={error}
                  success={success}
                  lang={translationState?.lan}
                  onVerify={handleVerify}
                  isLoading={isLoading}
                  attemptsLeft={MAX_ATTEMPTS - attempts}
                  lockUntil={lockUntil}
                />
              </div>

              <div className="col-span-2 w-full min-h-[400px]">
                {isLoading ? (
                  <div className="bg-white border border-gray-100 rounded-2xl p-10 flex flex-col items-center justify-center h-full space-y-6 shadow-sm">
                    <div className="w-12 h-12 border-4 border-[#1B4075]/20 border-t-[#1B4075] rounded-full animate-spin" />
                    <p className="text-[#1B4075] font-bold animate-pulse">
                      ...
                    </p>
                  </div>
                ) : (
                
                    <ResultStates
                      error={error}
                      setError={setError}
                      lang={translationState?.lan}
                      customerData={customerData}
                      onConfirm={(rec) =>
                        toast.success(
                          `${languageTranslate(
                            translationState?.lan,
                            "confirmedRecord"
                          )} ${rec.accountID}`
                        )
                      }
                      onReset={resetSearch}
                    />
                  
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Saving;
