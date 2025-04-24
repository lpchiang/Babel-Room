/* https://www.youtube.com/watch?v=LeWhCsQk1PM */

const Auth = ({children}: {children: React.ReactNode}) => {
  return (
    <section className="w-full">
        <div className="h-screen flex items-center justify-center">
            {children}
        </div>
    </section>
  )
};

export default Auth;