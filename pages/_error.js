function Error({ statusCode }) {
  return (
    <div className="Error">
      {statusCode
        ? `서버에서 ${statusCode} 오류가 발생했습니다.`
        : "클라이언트에서 오류가 발생했습니다."}
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
