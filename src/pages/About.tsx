import React from "react";
import { Header } from "../components/Header";
import { AboutWrapper } from "../styles/globals";

export default function About() {
    return (
        <>
            <Header />
            <AboutWrapper>
                <div className="container-about" >
                    <div >
                        <h2 className="text-center headingtwoB">Sobre</h2>
                        <blockquote >
                            <p className="">
                                Olá muito bem vindo, este projeto este projeto é uma Pokedex simples, <a href="https://www.linkedin.com/in/carlos-esteves-4b4a1859/" className="button2 b-green rot-135" target={'_blank'}>Carlos Esteves</a> segue uma linha de codificações para mostrar um pouco
                                de meus conhecimnetos em Front End, neste projeto estou usando <b className="skill">React</b>, <b className="skill">React Hooks</b>, <b className="skill">Context Api</b>, <b className="skill">Styled Component</b>, <b className="skill">Single-Spa (microfrontends)</b>,
                               <b className="skill">Axios</b>.
                            </p>
                        </blockquote>
                    </div>
                </div>
            </AboutWrapper>
        </>
    );
}

