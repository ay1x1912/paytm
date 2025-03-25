

import NavBar from "@/components/navBar";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <main className="h-screen bg-red-400 flex flex-col justify-center items-center">  
        {children} 
      </main>
      
       
       
  );
}
