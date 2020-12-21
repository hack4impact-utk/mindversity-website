import { NextPage, NextPageContext } from "next";
import Router from "next/router";
import urls from "utils/urls";

const nameChapterPage: NextPage = () => {
    return <div></div>;
};

export async function getServerSideProps(context: NextPageContext) {
    const cookie = context.req?.headers.cookie;

    const resp = await fetch(`${urls.baseUrl}${urls.api.admin.validateLogin}`, {
        headers: {
            cookie: cookie!,
        },
    });

    if (resp.status === 401 && !context.req) {
        void Router.replace(`${urls.pages.portal.login}`);
        return { props: {} };
    }

    if (resp.status === 401 && context.req) {
        context.res?.writeHead(302, {
            Location: `${urls.baseUrl}`,
        });
        context.res?.end();
        return { props: {} };
    }

    return { props: {} };
}

export default nameChapterPage;
