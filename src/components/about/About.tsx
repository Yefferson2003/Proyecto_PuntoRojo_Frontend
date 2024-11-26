
function About() {
    return (
        <div className="flex flex-col lg:flex-row   max-w-[1000px]  mx-auto gap-4">
            <section className="flex flex-col text-justify mx-auto w-[70%] lg:px-9">
                <div className="">	
                    <h2 className="text-center text-bold font-bold "> MISIÓN </h2>
                    <p className="pt-2" >Proveer a la comunidad de Aguachica con una amplia variedad de
                        víveres, abarrotes y licores de alta calidad, garantizando siempre 
                        frescura y buenos precios. Nos comprometemos a ofrecer un servicio 
                        excepcional y personalizado, creando un ambiente de confianza y satisfacción 
                        para nuestros clientes.
                    </p>
                </div>
                <div className="pt-8">
                    <h2 className="text-center text-bold font-bold ">VISIÓN</h2>
                    <p className="pt-2">Ser el minimercado líder en Aguachica, reconocido por nuestra excelencia en servicio y calidad de productos, contribuyendo al bienestar de la comunidad. Aspiramos a expandir nuestra oferta y mejorar continuamente para satisfacer las necesidades de nuestros clientes, convirtiéndonos en su primera opción de compra.
                        Estos principios fundamentales guiarán el desarrollo del software, asegurando que esté alineado con los objetivos estratégicos y valores de la empresa.
                    </p>
                </div>
                
                <div className="pt-8" >
                    <h2 className="text-center text-bold font-bold">VALORES</h2>
                    <p className="pt-2">•	Calidad: Ofrecemos productos frescos y de alta calidad, asegurándonos de satisfacer las expectativas de nuestros clientes en cada compra. </p>
                    <p className="pt-2">•	Servicio al Cliente: Brindamos una atención personalizada y amable, siempre dispuestos a escuchar y resolver las necesidades de nuestros clientes.</p>
                    <p className="pt-2">•	Honestidad: Actuamos con integridad y transparencia en todas nuestras operaciones, construyendo relaciones de confianza con nuestra comunidad.</p>
                </div>

                <div className="pt-8">
                    <h2 className="text-center text-bold font-bold">COMPROMISO</h2>
                    <p className="pt-2">Compromiso: Nos dedicamos a ofrecer lo mejor a nuestros clientes, garantizando un ambiente limpio, seguro y organizado en nuestro minimercado.</p>
                </div>
            </section>

            <section className="flex lg:px-9 flex-col text-justify mx-auto lg:w-[30%] w-[70%]  lg:border-l-4 lg:border-black gap-5 justify-start" >
                <div className="border-current border rounded-lg px-2 flex ">
                        <img className='w-[64px]' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxwYXRoIGZpbGw9IiNmZjAwMDAiIGQ9Ik0xMC41IDEzdjEuNXEwIC40MjUuMjg4LjcxM3QuNzEyLjI4N2gxcS40MjUgMCAuNzEzLS4yODh0LjI4Ny0uNzEyVjEzSDE1cS40MjUgMCAuNzEzLS4yODhUMTYgMTJ2LTFxMC0uNDI1LS4yODgtLjcxMlQxNSAxMGgtMS41VjguNXEwLS40MjUtLjI4OC0uNzEyVDEyLjUgNy41aC0xcS0uNDI1IDAtLjcxMi4yODhUMTAuNSA4LjVWMTBIOXEtLjQyNSAwLS43MTIuMjg4VDggMTF2MXEwIC40MjUuMjg4LjcxM1Q5IDEzem0xLjUgOC45cS0uMTc1IDAtLjMyNS0uMDI1dC0uMy0uMDc1UTggMjAuNjc1IDYgMTcuNjM3VDQgMTEuMVY2LjM3NXEwLS42MjUuMzYzLTEuMTI1dC45MzctLjcyNWw2LTIuMjVxLjM1LS4xMjUuNy0uMTI1dC43LjEyNWw2IDIuMjVxLjU3NS4yMjUuOTM4LjcyNVQyMCA2LjM3NVYxMS4xcTAgMy41LTIgNi41MzhUMTIuNjI1IDIxLjhxLS4xNS4wNS0uMy4wNzVUMTIgMjEuOSIvPjwvc3ZnPg==" alt="" />
                        <p className="pt-2">Tu seguridad es nuestra máxima prioridad.</p>
                </div>

                <div className="border-current border rounded-lg px-2 flex gap-2">
                    <img className='w-[64px]' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNjAiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgNjQwIDUxMiI+PHBhdGggZmlsbD0iI2ZmMDAwMCIgZD0ibTMyMy40IDg1LjJsLTk2LjggNzguNGMtMTYuMSAxMy0xOS4yIDM2LjQtNyA1My4xYzEyLjkgMTcuOCAzOCAyMS4zIDU1LjMgNy44bDk5LjMtNzcuMmM3LTUuNCAxNy00LjIgMjIuNSAyLjhzNC4yIDE3LTIuOCAyMi41TDM3MyAxODguOEw1NTAuMiAzNTJINTkyYzI2LjUgMCA0OC0yMS41IDQ4LTQ4VjE3NmMwLTI2LjUtMjEuNS00OC00OC00OGgtODAuN2wtMy45LTIuNUw0MzQuOCA3OWMtMTUuMy05LjgtMzMuMi0xNS01MS40LTE1Yy0yMS44IDAtNDMgNy41LTYwIDIxLjJtMjIuOCAxMjQuNGwtNTEuNyA0MC4yYy0zMS41IDI0LjYtNzcuMiAxOC4yLTEwMC44LTE0LjJjLTIyLjItMzAuNS0xNi42LTczLjEgMTIuNy05Ni44bDgzLjItNjcuM2MtMTEuNi00LjktMjQuMS03LjQtMzYuOC03LjRDMjM0IDY0IDIxNS43IDY5LjYgMjAwIDgwbC03MiA0OEg0OGMtMjYuNSAwLTQ4IDIxLjUtNDggNDh2MTI4YzAgMjYuNSAyMS41IDQ4IDQ4IDQ4aDEwOC4ybDkxLjQgODMuNGMxOS42IDE3LjkgNDkuOSAxNi41IDY3LjgtMy4xYzUuNS02LjEgOS4yLTEzLjIgMTEuMS0yMC42bDE3IDE1LjZjMTkuNSAxNy45IDQ5LjkgMTYuNiA2Ny44LTIuOWM0LjUtNC45IDcuOC0xMC42IDkuOS0xNi41YzE5LjQgMTMgNDUuOCAxMC4zIDYyLjEtNy41YzE3LjktMTkuNSAxNi42LTQ5LjktMi45LTY3Ljh6Ii8+PC9zdmc+" alt="" />
                    <p className="pt-2">Construimos relaciones basadas en confianza</p> 
                </div>

                <div className=" border-current border rounded-lg px-2 flex gap-2">    
                    <img className='w-[64px]' src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiPjxnIGZpbGw9Im5vbmUiPjxwYXRoIHN0cm9rZT0iI2ZmMDAwMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTTkgMTZjLjg1LjYzIDEuODg1IDEgMyAxczIuMTUtLjM3IDMtMSIvPjxwYXRoIGZpbGw9IiNmZjAwMDAiIGQ9Ik0xNiAxMC41YzAgLjgyOC0uNDQ4IDEuNS0xIDEuNXMtMS0uNjcyLTEtMS41cy40NDgtMS41IDEtMS41czEgLjY3MiAxIDEuNSIvPjxlbGxpcHNlIGN4PSI5IiBjeT0iMTAuNSIgZmlsbD0iI2ZmMDAwMCIgcng9IjEiIHJ5PSIxLjUiLz48cGF0aCBzdHJva2U9IiNmZjAwMDAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik03IDMuMzM4QTkuOTUgOS45NSAwIDAgMSAxMiAyYzUuNTIzIDAgMTAgNC40NzcgMTAgMTBzLTQuNDc3IDEwLTEwIDEwUzIgMTcuNTIzIDIgMTJjMC0xLjgyMS40ODctMy41MyAxLjMzOC01Ii8+PC9nPjwvc3ZnPg==" alt="" />
                    <p className="pt-2">Atendemos con amabilidad, porque cada detalle importa. </p>
                   
                </div>
                
            </section>
        </div>
        
    )
}

export default About