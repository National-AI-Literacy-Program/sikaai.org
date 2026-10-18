import Footer from "@/app/components/footer";
import Header from "@/app/components/Header";
import About from "@/app/components/homepage/about";
import Content from "@/app/components/homepage/content";
import Course from "@/app/components/homepage/course";
import Hero from "@/app/components/homepage/hero";
import Incubator from "@/app/components/homepage/incubate";
import Ref from "@/app/components/homepage/ref";
import Team from "@/app/components/homepage/team";
export default function App() {
  return (
    <>
         <main className="min-h-dvh overflow-hidden bg-background font-sans text-foreground antialiased">
      <Header />

      <Hero />
      <Course />
      <Content />
      <Ref />
      <About />
      <Team />
      <Incubator />

      <Footer />
    </main> 
    </>
  )
}
