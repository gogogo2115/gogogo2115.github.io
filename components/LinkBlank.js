
function LinkBlank({href,title,children}){

    const relOpt = 'noopener noreferrer nofollow';
    const setTitle = (title === undefined || title === null) ? '외부로 연결되는 링크입니다.' : title;

    return(
    <a href={href} target="_blank" title={setTitle} rel={relOpt}>
        {children}
    </a>
    );
}
export default LinkBlank;