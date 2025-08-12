"use client";
import React, { useState, useMemo, useEffect } from "react";
import { customTokenizer } from "../tokenizer";

function HeroSection() {
  const [text, setText] = useState("");
  const [tokens, setTokens] = useState([]);
  const [decoded, setDecoded] = useState([]);

  const tokenizer = useMemo(() => new customTokenizer(), []);

  // Whenever text changes to encode tokens
  useEffect(() => {
    if (!text.trim()) {
      setTokens([]);
      setDecoded([]);
      return;
    }

    tokenizer.fitOnText(text);
    const encoded = tokenizer.encode(text);
    setTokens(encoded);

    const decodedString = tokenizer.decode(encoded);
    setDecoded(decodedString.trim().split(/\s+/));
  }, [text, tokenizer]);

  const tokenToColor = (token) => {
    const colors = ["#ffcccb", "#90ee90", "#add8e6", "#ffd700", "#dda0dd"];
    return colors[token.length % colors.length];
  };

  return (
    <div className="min-h-screen bg-[#00246B] text-white p-4 sm:p-6 md:p-10">
      <h1 className="text-3xl font-extrabold flex items-center justify-center">
        TokenizeIt{" "}
      </h1>
      <p className="text-xs flex items-center justify-center mt-5 mb-20">
        {" "}
        A custom tokenizer that transforms raw text into structured tokens,
        supporting special tokens like PAD, UNK, BOS, and EOS for AI workflows.{" "}
      </p>
      {/* Input & Tokens Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Box */}
        <div>
          <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
            Input Text
          </h2>
          <textarea
            placeholder="Enter your text here to tokenize..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex items-center justify-center w-full h-40 sm:h-48 md:h-60 p-3 sm:p-4 rounded-2xl bg-[#CADCFC] mt-3 outline-none placeholder-black resize-none text-center text-lg sm:text-2xl leading-[3rem] text-black"
          />
        </div>

        {/* Tokens Output */}
        <div>
          <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
            Generated Tokens
          </h2>
          <div className="h-40 sm:h-48 md:h-60 p-3 sm:p-4 rounded-2xl bg-[#CADCFC] mt-3 flex flex-col items-center justify-center text-gray-400">
            {tokens.length === 0 ? (
              <div className="flex justify-center">
                <p className="text-sm sm:text-base text-black">Results will appear here</p>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2 text-lg sm:text-xl">
                {tokens.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 text-lg sm:text-2xl rounded"
                    style={{
                      backgroundColor: tokenToColor(decoded[i] || ""),
                      color: "#000",
                    }}
                    title={`Decoded: ${decoded[i] || ""}`}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Token Count */}
      <div className="flex items-center justify-center">
        {tokens.length > 0 && (
          <p className="bg-sky-800 p-3 sm:p-5 text-lg sm:text-2xl w-fit rounded-2xl mt-6">
            <strong>Total Token Count: </strong>
            {tokens.length}
          </p>
        )}
      </div>

      {/* Decoded Tokens */}
      <div className="flex items-center justify-center">
        {decoded.length > 0 && (
          <div className="mt-6 p-3 sm:p-5 bg-sky-800 rounded-lg shadow max-w-full sm:max-w-2xl w-fit overflow-x-auto">
            <h2 className="font-bold mb-2 text-lg sm:text-2xl">
              Decoded Tokens
            </h2>
            <div className="flex flex-wrap gap-2">
              {decoded.map((d, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-lg sm:text-2xl rounded"
                  style={{ backgroundColor: tokenToColor(d), color: "#000" }}
                >
                  {d}
                </span>
              ))}
            </div>
            <p className="mt-3 text-lg sm:text-2xl">
              <strong>Encoded Tokens:</strong> {JSON.stringify(tokens)}
            </p>
            <p className="text-lg sm:text-2xl">
              <strong className="text-lg sm:text-2xl">Decoded Text:</strong>{" "}
              {decoded.join(" ")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroSection;
