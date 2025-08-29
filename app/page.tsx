export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold mb-8">Welcome to Retyped</h1>
        
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Scroll down to see navbar behavior</h2>
          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
        </section>

        {/* Dummy content to enable scrolling */}
        {[...Array(10)].map((_, i) => (
          <section key={i} className="mb-16">
            <h2 className="text-2xl font-semibold mb-4">Section {i + 1}</h2>
            <div className="bg-gray-50 rounded-lg p-6 mb-4">
              <h3 className="text-lg font-medium mb-2">Subsection {i + 1}.1</h3>
              <p className="text-gray-600 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio 
                vitae vestibulum. Donec auctor a lacus in tincidunt. Proin blandit, tortor at 
                ultrices tincidunt, elit sapien facilisis lectus, nec accumsan nulla massa a 
                odio. Sed cursus turpis in mauris vehicula, et consequat nisl faucibus.
              </p>
              <p className="text-gray-600 mb-4">
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia 
                curae; Sed congue, magna at tincidunt cursus, libero orci volutpat dolor, vel 
                consectetur ante urna sed tortor. Integer posuere semper augue, id ornare nunc 
                blandit eget.
              </p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium mb-2">Subsection {i + 1}.2</h3>
              <p className="text-gray-600">
                Mauris eleifend, dolor at dictum eleifend, odio est fermentum nulla, in vehicula 
                ipsum ante sed lorem. Aliquam erat volutpat. Maecenas non dolor vel ante semper 
                blandit. Nam vel tellus at ex rutrum tempus vel in felis.
              </p>
            </div>
          </section>
        ))}

        <footer className="border-t pt-8 mt-20">
          <p className="text-gray-500 text-center">
            Keep scrolling up and down to test the navbar hide/show behavior
          </p>
        </footer>
      </div>
    </div>
  );
}