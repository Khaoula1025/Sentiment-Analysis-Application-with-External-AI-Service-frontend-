"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const [result, setResult] = useState<any>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/verify-token", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          router.push("/login");
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        router.push("/login");
      }
    }

    checkAuth();
  }, [router]);

  async function sendComment(e: any) {
    e.preventDefault();
    setError("");
    setResult("");

    if (!comment.trim()) {
      setError("Please enter a comment");
      return;
    }

    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ text: comment }),
      });

      if (res.status === 401 || res.status === 403) {
        router.push("/login");
        return;
      }

      const data = await res.json();

      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || "Failed to analyze sentiment");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error(error);
    }
  }

  async function logout() {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (res.ok) {
        router.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-xl bg-white shadow-lg rounded-xl p-6">
        <form onSubmit={sendComment} className="flex flex-col gap-4">
          <label className="text-lg font-semibold text-gray-700">
            Enter Your Comment:
          </label>

          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type something..."
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
          >
            Send
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
            <h2 className="text-lg font-bold mb-3 text-gray-700">Results:</h2>

            <ul className="space-y-1 text-gray-800">
              <li>
                <span className="font-semibold">Score:</span> {result.score}
              </li>
              <li>
                <span className="font-semibold">Confidence:</span>{" "}
                {result.confidence}
              </li>
              <li>
                <span className="font-semibold">Sentiment:</span>{" "}
                {result.sentiment}
              </li>
            </ul>
          </div>
        )}
      </div>
      <button onClick={logout} className=" absolute bottom-0.5 right-3">
        <svg
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.25 2.62451C10.0074 2.62451 9 3.63187 9 4.87451V6.60927C9.76128 6.98704 10.2493 7.76589 10.2493 8.62451V10.3745L11.75 10.3745C12.9926 10.3745 14 11.3819 14 12.6245C14 13.8672 12.9926 14.8745 11.75 14.8745H10.2493V16.6245C10.2493 17.4831 9.76128 18.262 9 18.6397V20.3745C9 21.6172 10.0074 22.6245 11.25 22.6245H17.25C18.4926 22.6245 19.5 21.6172 19.5 20.3745V4.87451C19.5 3.63187 18.4926 2.62451 17.25 2.62451H11.25Z"
            fill="#323544"
          />
          <path
            d="M8.28618 7.93158C8.5665 8.04764 8.74928 8.32114 8.74928 8.62453L8.74928 11.8745L11.75 11.8745C12.1642 11.8745 12.5 12.2103 12.5 12.6245C12.5 13.0387 12.1642 13.3745 11.75 13.3745L8.74928 13.3745V16.6245C8.74928 16.9279 8.56649 17.2014 8.28617 17.3175C8.00585 17.4335 7.68322 17.3693 7.46877 17.1547L3.50385 13.187C3.34818 13.0496 3.25 12.8485 3.25 12.6245C3.25 12.4016 3.34723 12.2015 3.50159 12.0641L7.46878 8.09437C7.68324 7.87978 8.00587 7.81552 8.28618 7.93158Z"
            fill="#323544"
          />
        </svg>
        logout
      </button>
    </div>
  );
}

export default Page;