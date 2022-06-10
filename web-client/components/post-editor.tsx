import { useState, useCallback } from "react";
import { createEditor, Editor, Transforms, Text, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";
import { Box, darken, IconButton } from "@mui/material";
import { FormatItalic, FormatBold } from "@mui/icons-material";

const defaultInitialValue = [
  {
    type: "paragraph" as const,
    children: [
      {
        text: "Mój opis. Edytor w rozwoju!",
      },
    ],
  },
];

const customEditor = {
  isBold(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.bold === true,
      universal: true,
    });

    return Boolean(match);
  },
  isItalic(editor: Editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.italic === true,
      universal: true,
    });

    return Boolean(match);
  },
  toggleBold: (editor: Editor) => {
    const isActive = customEditor.isBold(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },
  toggleItalic: (editor: Editor) => {
    const isActive = customEditor.isItalic(editor);
    Transforms.setNodes(
      editor,
      { italic: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },
};

export const useEditor = (initialState: Descendant[]) => {
  const [state, setState] = useState<Descendant[]>(initialState);

  const getSerialized = useCallback(() => JSON.stringify(state), [state]);
  const onChange = useCallback((value: Descendant[]) => setState(value), []);

  return {
    getSerialized,
    onChange,
  };
};

export interface PostEditorProps {
  initialValue?: Descendant[];
  onChange?: (value: Descendant[]) => void;
  readOnly?: boolean;
}

export const PostEditor: React.FC<PostEditorProps> = ({
  initialValue = defaultInitialValue,
  onChange,
  readOnly,
}) => {
  const [editor] = useState(() => withReact(createEditor()));

  const renderLeaf = useCallback((props: unknown) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <Box>
      {!readOnly && (
        <Box>
          <IconButton onClick={() => customEditor.toggleBold(editor)}>
            <FormatBold />
          </IconButton>
          <IconButton onClick={() => customEditor.toggleItalic(editor)}>
            <FormatItalic />
          </IconButton>
        </Box>
      )}

      <Box
        p={readOnly ? undefined : 1}
        sx={readOnly ? undefined : { bgcolor: darken("#ffffff", 0.05) }}
      >
        <Slate
          onChange={(value) => {
            const isAstChange = editor.operations.some(
              (op) => "set_selection" !== op.type
            );
            if (isAstChange) onChange?.(value);
          }}
          editor={editor}
          value={initialValue}
        >
          <Editable
            readOnly={readOnly}
            renderLeaf={renderLeaf}
            onKeyDown={(event) => {
              if (!event.ctrlKey) {
                return;
              }

              switch (event.key) {
                case "b": {
                  event.preventDefault();
                  customEditor.toggleBold(editor);
                  break;
                }

                case "i": {
                  event.preventDefault();
                  customEditor.toggleItalic(editor);
                  break;
                }
              }
            }}
          />
        </Slate>
      </Box>
    </Box>
  );
};

const Leaf = (props) => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? "bold" : "normal",
        fontStyle: props.leaf.italic ? "italic" : "normal",
      }}
    >
      {props.children}
    </span>
  );
};
