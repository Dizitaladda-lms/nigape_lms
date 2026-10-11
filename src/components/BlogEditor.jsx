"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { Table, TableRow, TableCell, TableHeader } from "@tiptap/extension-table";
import Underline from "@tiptap/extension-underline";

const extensions = [
  StarterKit.configure({ heading: { levels: [2, 3, 4, 5, 6] } }),
  Placeholder.configure({ placeholder: "Write your blog content..." }),
  Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
  Image.configure({ inline: false }),
  Underline,
  Table.configure({ resizable: false }),
  TableRow,
  TableCell,
  TableHeader,
];

const controls = [
  {
    label: "B",
    title: "Bold",
    command: (editor) => editor.chain().focus().toggleBold().run(),
    isActive: (editor) => editor.isActive("bold"),
  },
  {
    label: "I",
    title: "Italic",
    command: (editor) => editor.chain().focus().toggleItalic().run(),
    isActive: (editor) => editor.isActive("italic"),
  },
  {
    label: "U",
    title: "Underline",
    command: (editor) => editor.chain().focus().toggleUnderline().run(),
    isActive: (editor) => editor.isActive("underline"),
  },
  { separator: true },
  {
    label: "H2",
    title: "Heading 2",
    command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 2 }),
  },
  {
    label: "H3",
    title: "Heading 3",
    command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    isActive: (editor) => editor.isActive("heading", { level: 3 }),
  },
  { separator: true },
  {
    label: "•",
    title: "Bullet List",
    command: (editor) => editor.chain().focus().toggleBulletList().run(),
    isActive: (editor) => editor.isActive("bulletList"),
  },
  {
    label: "1.",
    title: "Ordered List",
    command: (editor) => editor.chain().focus().toggleOrderedList().run(),
    isActive: (editor) => editor.isActive("orderedList"),
  },
  { separator: true },
  {
    label: "\"",
    title: "Blockquote",
    command: (editor) => editor.chain().focus().toggleBlockquote().run(),
    isActive: (editor) => editor.isActive("blockquote"),
  },
  {
    label: "<>",
    title: "Code Block",
    command: (editor) => editor.chain().focus().toggleCodeBlock().run(),
    isActive: (editor) => editor.isActive("codeBlock"),
  },
];

// ── Link dialog ──────────────────────────────────────────────────────────────
const LinkDialog = ({ editor, savedSelection, onClose }) => {
  const [url, setUrl] = useState(() => editor.getAttributes("link").href || "");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const applyLink = () => {
    const trimmed = url.trim();
    const hasSel = savedSelection && savedSelection.from !== savedSelection.to;
    if (!trimmed) {
      // Remove link — restore selection first if we have one
      const chain = hasSel
        ? editor.chain().setTextSelection(savedSelection)
        : editor.chain().focus();
      chain.unsetLink().run();
    } else {
      const href = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
      if (hasSel) {
        // Apply link to exactly the saved selection in one chained transaction
        editor
          .chain()
          .setTextSelection(savedSelection)
          .setLink({ href, target: "_blank", rel: "noopener noreferrer" })
          .run();
      } else {
        // Cursor only — store the mark so next typed text is linked
        editor.chain().focus().setLink({ href, target: "_blank", rel: "noopener noreferrer" }).run();
      }
    }
    onClose();
  };

  const handleRemove = () => {
    const hasSel = savedSelection && savedSelection.from !== savedSelection.to;
    const chain = hasSel
      ? editor.chain().setTextSelection(savedSelection)
      : editor.chain().focus();
    chain.unsetLink().run();
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") { e.preventDefault(); applyLink(); }
    if (e.key === "Escape") onClose();
  };

  return (
    <div className="editor__link-backdrop" onClick={onClose}>
      <div
        className="editor__link-dialog"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="editor__link-dialog-title">Insert Link</div>
        <input
          ref={inputRef}
          className="editor__link-input"
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <div className="editor__link-actions">
          {editor.isActive("link") && (
            <button type="button" className="editor__link-btn editor__link-btn--remove" onClick={handleRemove}>
              Remove
            </button>
          )}
          <button type="button" className="editor__link-btn" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="editor__link-btn editor__link-btn--primary" onClick={applyLink}>
            {url.trim() ? "Apply" : "Remove"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Image insert dialog ───────────────────────────────────────────────────────
const ImageDialog = ({ editor, onClose }) => {
  const [tab, setTab] = useState("upload"); // "upload" | "url"
  const [imageUrl, setImageUrl] = useState("");
  const [altText, setAltText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const urlInputRef = useRef(null);

  useEffect(() => {
    if (tab === "url") urlInputRef.current?.focus();
  }, [tab]);

  const insertImage = (src, alt) => {
    if (!src) return;
    editor.chain().focus().setImage({ src, alt: alt || "" }).run();
    // Insert a paragraph after so the user can keep typing
    editor.chain().focus().createParagraphNear().run();
    onClose();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Immediate local preview while upload runs
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    setError("");
    setUploading(true);

    try {
      const { withAdminCsrf } = await import("@/lib/client-csrf");
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", withAdminCsrf({ method: "POST", body: fd }));
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setImageUrl(data.url);
      setError("");
    } catch (err) {
      setError(err.message || "Upload failed. Try using a URL instead.");
      setImageUrl("");
    } finally {
      setUploading(false);
    }
  };

  const handleInsert = () => {
    const src = imageUrl.trim();
    if (!src) { setError("Please upload an image or enter a URL."); return; }
    insertImage(src, altText);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Enter" && tab === "url") { e.preventDefault(); handleInsert(); }
  };

  return (
    <div className="editor__link-backdrop" onClick={onClose}>
      <div
        className="editor__link-dialog editor__img-dialog"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        style={{ minWidth: 320, maxWidth: 420 }}
      >
        <div className="editor__link-dialog-title">Insert Image</div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <button
            type="button"
            className={`editor__link-btn${tab === "upload" ? " editor__link-btn--primary" : ""}`}
            onClick={() => setTab("upload")}
            style={{ flex: 1 }}
          >
            📁 Upload File
          </button>
          <button
            type="button"
            className={`editor__link-btn${tab === "url" ? " editor__link-btn--primary" : ""}`}
            onClick={() => setTab("url")}
            style={{ flex: 1 }}
          >
            🔗 From URL
          </button>
        </div>

        {/* Upload tab */}
        {tab === "upload" && (
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <button
              type="button"
              className="editor__link-btn"
              style={{ width: "100%", marginBottom: 10, padding: "10px" }}
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? "Uploading…" : "Choose Image from Computer"}
            </button>
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: "100%", maxHeight: 180, objectFit: "contain",
                  borderRadius: 8, marginBottom: 10, background: "#111",
                }}
              />
            )}
            {uploading && (
              <p style={{ fontSize: "0.8rem", color: "#888", marginBottom: 8 }}>
                Uploading to image host…
              </p>
            )}
            {imageUrl && !uploading && (
              <p style={{ fontSize: "0.78rem", color: "#4ade80", marginBottom: 8, wordBreak: "break-all" }}>
                ✓ Ready to insert
              </p>
            )}
          </div>
        )}

        {/* URL tab */}
        {tab === "url" && (
          <input
            ref={urlInputRef}
            className="editor__link-input"
            type="text"
            placeholder="https://example.com/image.webp"
            value={imageUrl}
            onChange={(e) => { setImageUrl(e.target.value); setPreview(e.target.value); }}
            style={{ marginBottom: 10 }}
          />
        )}

        {/* Alt text — always visible */}
        <input
          className="editor__link-input"
          type="text"
          placeholder="Alt text (describe the image for SEO)"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          style={{ marginBottom: 4 }}
        />
        <p style={{ fontSize: "0.75rem", color: "#888", marginBottom: 12 }}>
          Alt text improves SEO and accessibility.
        </p>

        {error && (
          <p style={{ fontSize: "0.8rem", color: "#f87171", marginBottom: 10 }}>{error}</p>
        )}

        <div className="editor__link-actions">
          <button type="button" className="editor__link-btn" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="editor__link-btn editor__link-btn--primary"
            onClick={handleInsert}
            disabled={uploading || !imageUrl.trim()}
          >
            Insert Image
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main editor ───────────────────────────────────────────────────────────────
const BlogEditor = ({ value, onChange }) => {
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const savedSelectionRef = useRef(null);

  const editor = useEditor({
    extensions,
    content: value || "",
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      onChange?.(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && typeof value === "string" && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [editor, value]);

  // Selection is now saved in the button's onMouseDown (before blur).
  // This callback is kept for any keyboard-triggered open in the future.
  const [linkSelection, setLinkSelection] = useState(null);

  const handleLinkClick = useCallback(() => {
    if (!editor) return;
    const { from, to } = editor.state.selection;
    setLinkSelection({ from, to });
    setShowLinkDialog(true);
  }, [editor]);

  const actions = useMemo(
    () =>
      controls.map((control) => {
        if (control.separator) return control;
        return {
          ...control,
          run: () => editor && control.command(editor),
          isActive: () => (editor ? control.isActive(editor) : false),
        };
      }),
    [editor]
  );

  if (!editor) {
    return <div className="editor editor--loading">Loading editor...</div>;
  }

  return (
    <div className="editor">
      <div className="editor__toolbar">
        {actions.map((control, i) => {
          if (control.separator) {
            return <span key={`sep-${i}`} className="editor__toolbar-sep" />;
          }
          return (
            <button
              key={control.label}
              type="button"
              title={control.title}
              onClick={control.run}
              className={control.isActive() ? "active" : ""}
            >
              {control.label}
            </button>
          );
        })}
        <span className="editor__toolbar-sep" />
        <button
          type="button"
          title="Insert / Edit Link"
          onMouseDown={(e) => {
            // preventDefault stops the editor from losing focus so the selection stays intact
            e.preventDefault();
            if (editor) {
              const { from, to } = editor.state.selection;
              setLinkSelection({ from, to });
            }
          }}
          onClick={() => setShowLinkDialog(true)}
          className={editor.isActive("link") ? "active" : ""}
        >
          🔗
        </button>
        <button
          type="button"
          title="Insert Image"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => setShowImageDialog(true)}
        >
          🖼️
        </button>
      </div>
      {showLinkDialog && (
        <LinkDialog
          editor={editor}
          savedSelection={linkSelection}
          onClose={() => {
            setShowLinkDialog(false);
            setLinkSelection(null);
          }}
        />
      )}
      {showImageDialog && (
        <ImageDialog
          editor={editor}
          onClose={() => setShowImageDialog(false)}
        />
      )}
      <EditorContent editor={editor} />
    </div>
  );
};

export default BlogEditor;
