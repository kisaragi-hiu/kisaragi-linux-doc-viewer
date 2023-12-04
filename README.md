# Kisaragi's Linux documentation viewer

On Arch Linux, documentation packages install documentation to `/usr/share/doc`, but I haven't found a good way to view them.

Each folder in `/usr/share/doc` is documentation for *something*, but the problem is that there are many different types of documentation in there.

Here's the ones I'm seeing:

- util-linux contains two example script files. They should be shown in code blocks, and there should be a page showing both of them.
- Many folders contain README.md or README plus a bunch of other plain text files. They should get a rendered view of the README.
- Some docs are in HTML, complete with an `index.html` where you can start navigating from
- in zsh/ there is a PDF and an HTML output.
- Some folders are empty. They should not be shown.
- There's also plain files in there

There should be a list of all documentations, and some way to open a navigation page for a particular documentation.

<hr>

This is probably going to be a small server.

Thinking of routes:

- `/`: root listing of documentations
- `/<docname>`: the page for the documentation
