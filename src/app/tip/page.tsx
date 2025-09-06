import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function TipPage() {
  return (
    <>
      <Navbar
        displayShorts={false}
        displayCalcButton={true}
        displayTipButton={false}
      />
      <main className="mx-auto max-w-xl lg:max-w-4xl px-4 py-12 flex flex-col items-center">
        <section className="w-full bg-white dark:bg-gray-900 rounded-lg shadow-md p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4 flex items-center gap-2">
                <span role="img" aria-label="coffee">
                  ☕
                </span>
                Soutenir le projet
              </h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                Ce site est un projet personnel développé sur mon temps libre.
                <br />
                Si tu apprécies mon travail, tu peux laisser un petit{" "}
                <strong>tip</strong>.<br />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  (C’est totalement <em>facultatif</em> et ça aide à financer
                  l’hébergement et le café&nbsp;☕)
                </span>
              </p>
              <p className="mt-6 text-sm text-gray-500">
                Merci infiniment pour ton soutien&nbsp;🙏
              </p>
            </div>
            <div className="flex-shrink-0 flex justify-center w-full lg:w-auto">
              <iframe
                id="kofiframe"
                src="https://ko-fi.com/kaeli1834/?hidefeed=true&widget=true&embed=true&preview=true"
                style={{
                  border: "none",
                  width: "340px",
                  maxWidth: "100%",
                  padding: "0",
                  height: "550px",
                  background: "#f5e9fa",
                  borderRadius: "12px",
                }}
                height="500"
                title="kaeli1834"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
