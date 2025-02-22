"use client";
import { useState, useEffect } from "react"; // Importa useEffect
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { motion } from "framer-motion";

interface PreviewPanelProps {
  code: string;
  staticPanel?: boolean;
}

export function PreviewPanel({ code, staticPanel = false }: PreviewPanelProps) {
  const [editorCode, setEditorCode] = useState(code);

  // Sincroniza el estado interno del editor con la prop `code`
  useEffect(() => {
    setEditorCode(code);
  }, [code]);

  const panelClassName = staticPanel
    ? "h-screen bg-background flex flex-col"
    : "fixed right-0 top-0 h-screen w-[40%] bg-custom-dark z-50 flex flex-col";

  return (
    <motion.div
      className={panelClassName}
      initial={{ opacity: 0, x: staticPanel ? 0 : 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      exit={{ opacity: 0, x: staticPanel ? 0 : 100 }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-between p-4 border-b border-border"
      >
        <h2 className="text-lg font-semibold">Code Panel</h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        className="flex-1 p-4 relative bg-custom-dark"
      >
        <CodeMirror
          value={editorCode} // Usa el estado interno del editor
          height="100%"
          theme={oneDark}
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => setEditorCode(value)} // Actualiza el estado interno al editar
          className="border-none rounded-md overflow-hidden"
        />
      </motion.div>
    </motion.div>
  );
}
