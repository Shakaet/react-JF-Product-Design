
import './App.css'
import AgricultureSection from './component/AgricultureSection'
import Banner from './component/Banner'
import Customer from './component/Customer'
import LandScape from './component/LandScape'
import Line from './component/Line'
import NavBar from './component/NavBar'
import Trusted from './component/Trusted'
import WhyUs from './component/WhyUs'

function App() {
  

  return (
  <div className='overflow-x-hidden overflow-y-hidden'>
    <NavBar></NavBar>
    <Banner></Banner>
    <AgricultureSection></AgricultureSection>
    <LandScape></LandScape>
    <Trusted></Trusted>
    <WhyUs></WhyUs>
    <Line></Line>
    <Customer></Customer>
  

    

  </div>
  )
}

export default App



 {/* <h2 style={{ transform: 'rotate(-5deg)', display: 'inline-block',width:"100%" }}>
  <div className="relative w-full overflow-hidden bg-blue-100">
      <div className="flex animate-scroll whitespace-nowrap">
        <span className="flex items-center mx-5 text-xl text-blue-700">
          <span className="mr-2">🏠</span> Quality Product
        </span>
        <span className="flex items-center mx-5 text-xl text-blue-700">
          <span className="mr-2">🚚</span> Shipping Across India
        </span>
        <span className="flex items-center mx-5 text-xl text-blue-700">
          <span className="mr-2">🏠</span> Quality Product
        </span>
        <span className="flex items-center mx-5 text-xl text-blue-700">
          <span className="mr-2">🚚</span> Shipping Across India
        </span>
      </div>
    </div>
</h2> */}
