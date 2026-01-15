import { useState, useEffect } from "react";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";
import { languageTranslate } from "../../utils/data";
import { useSelector } from "react-redux";

const VerificationForm = ({ onVerify, isLoading, attemptsLeft, lockUntil }) => {
  const translationState = useSelector((state) => state.translation);
  const [bank, setBank] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (lockUntil) {
      const timer = setInterval(() => {
        const now = Date.now();
        const diff = Math.max(0, Math.ceil((lockUntil - now) / 1000));
        setTimeLeft(diff);
        if (diff <= 0) clearInterval(timer);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [lockUntil]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (bank.length > 1 && attemptsLeft > 0 && !lockUntil) {
      await onVerify({ bank });
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 13);
    setBank(value);
  };

  const isLocked = lockUntil !== null && timeLeft > 0;
  const isButtonDisabled = isLoading || isLocked;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getBorderColor = () => {
    if (isLocked) return "border-red-200";

    return "border-[#1B4075]/10 focus:ring-2 focus:ring-[#1B4075]";
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-5 sm:space-y-6 w-full bg-white p-5 sm:p-8 rounded-2xl shadow-sm border border-[#1B4075]/10"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex flex-wrap justify-between items-center gap-2">
              <label className="text-[16px] sm:text-[14px] font-black text-[#1B4075] uppercase flex items-center gap-2  not-italic text-left ">
                <CreditCard className="w-4 h-4 text-[#1B4075]" />

                {languageTranslate(translationState?.lan, "bankAccountNumber")}
              </label>
            </div>

            <div className="relative">
              <div className="space-y-3">
                <input
                  disabled={isLocked}
                  type="text"
                  value={bank}
                  onChange={handleInputChange}
                  className={`w-full h-12 sm:h-14 px-4 bg-[#1B4075]/5 border rounded-xl transition-all outline-none text-base sm:text-lg font-black tracking-[0.1em] ${getBorderColor()} ${
                    isLocked ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  placeholder={languageTranslate(
                    translationState?.lan,
                    "enterAccountNumber"
                  )}
                />
              </div>

              {isLocked && (
                <div className="absolute inset-0 bg-[#1B4075]/5 rounded-xl pointer-events-none" />
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-end items-center">
            <button
              disabled={isButtonDisabled}
              type="submit"
              className={`w-full px-4 h-12 sm:h-14 rounded-xl font-black text-sm sm:text-base transition-all flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-[#1B4075]/20 ${
                isLocked ? "bg-red-600" : "bg-[#1B4075] hover:bg-[#132f56]"
              } text-white`}
            >
              {isLoading ? (
                <div className="w-5 h-5 sm:w-6 sm:h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isLocked ? (
                <>
                  <Lock className="w-5 h-5" />
                  {languageTranslate(translationState?.lan, "locked")}:{" "}
                  {formatTime(timeLeft)}
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  {languageTranslate(translationState?.lan, "submit")}
                </>
              )}
            </button>
          </div>
          <div className="flex justify-center">
            <span
              className={`text-[14px] sm:text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-[#1B4075]/5 ${
                attemptsLeft === 0 || isLocked
                  ? "text-red-600 font-bold"
                  : attemptsLeft <= 2
                  ? "text-red-600 font-bold"
                  : "text-[#1B4075]/40"
              }`}
            >
              {attemptsLeft}{" "}
              {languageTranslate(translationState?.lan, "attemptsRemaining")}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;
