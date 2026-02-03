export default defineContentScript({
    matches: ['*://*/*'],
    main(ctx) {
        if (ctx.isValid) {
            console.log("hello sign google", ctx);
            // do something
            const siteForm = document.getElementsByTagName('form');

            if (!siteForm) {
                alert("no form found!")
            };
            console.log(siteForm);

        }

        else if (ctx.isInvalid) {
            console.log("invalid context or enable javascript");
        };

    },
});