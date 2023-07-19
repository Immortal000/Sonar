<script>
    import { onMount, onDestroy } from "svelte";
    import { Editor } from "@tiptap/core";
    import StarterKit from "@tiptap/starter-kit";
    import BubbleMenu from "@tiptap/extension-bubble-menu";
    import Link from "@tiptap/extension-link";

    //tiptap variables
    let element;
    let editor;
    export let text = null;

    //tiptap intialization
    onMount(() => {
        editor = new Editor({
            element: element,
            editorProps: {
                attributes: {
                    class: "px-1 bg-gray-100 rounded-b",
                },
            },
            extensions: [
                StarterKit,
                Link.configure({
                    linkOnPaste: true,
                    openOnClick: true,
                    HTMLAttributes: {
                        class: 'underline text-blue-400',
                    }
                }),
                BubbleMenu.configure({
                    shouldShow: ({
                        editor,
                        view,
                        state,
                        oldState,
                        from,
                        to,
                    }) => {
                        return editor.isActive("bold");
                    },
                }),
            ],
            content: "Testing...",
            autofocus: true,
            editable: true,
            enablePasteRules: true,
            enableInputRules: true,
            injectCSS: false,
            onTransaction: () => {
                // force re-render so `editor.isActive` works as expected
                editor = editor;
            },
            onUpdate: ({ editor }) => {
                text = editor.getHTML();
                console.log(text);
            }
        });
    });

    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });
</script>

<div class="TipTap-container">
    {#if editor}
        <div class="bg-gray-200 rounded-t px-1 py-1">
            <button
                on:click={() => editor.chain().focus().toggleBold().run()}
                class:active={editor.isActive("bold")}
                class="hover:bg-gray-300 rounded text-gray-400 px-1 py-1"
            >
                <i class=" fa-solid fa-bold h-5" />
            </button>
            <button
                on:click={() => editor.chain().focus().toggleItalic().run()}
                class:active={editor.isActive("italic")}
                class="hover:bg-gray-300 rounded text-gray-400 px-1 py-1"
            >
                <i class="fa-solid fa-italic h-5" />
            </button>
            <button
                on:click={() => {
                    if(editor.isActive('link')) {
                        editor.chain().focus().unsetLink().run();
                    } else {
                        editor.chain().focus().setLink().run();
                    }
                    }}
                class:active={editor.isActive("link")}
                class="hover:bg-gray-300 rounded text-gray-400 px-1 py-1"
            >
                <i class="fa-solid fa-link h-5" />
            </button>
            <button
                on:click={() => editor.chain().focus().toggleStrike().run()}
                class:active={editor.isActive("strike")}
                class="hover:bg-gray-300 rounded text-gray-400 px-1 py-1"
            >
                <i class="fa-solid fa-strikethrough  h-5"/>
            </button>
        </div>
    {/if}

    <div bind:this={element} />
</div>

<style>
    /* bg-gray-900 */
    button.active {
        color: #030712;
    }
</style>
