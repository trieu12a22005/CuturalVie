function Layout({ children, url }) {
  return (
    <div
      className="h-screen w-full bg-cover bg-center overflow-hidden flex justify-center items-center"
      style={{ backgroundImage: `url(${url})` }}
    >
      {children}
    </div>
  );
}

export default Layout;
