import React, { useEffect, useState, useMemo } from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const typewriter = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

const blink = keyframes`
  from, to { border-color: transparent }
  50% { border-color: #4169E1 }
`;

const ufoHover = keyframes`
  0% {
    transform: translateY(0) rotate(0deg);
    box-shadow: 0 0 5px rgba(65, 105, 225, 0.3);
  }
  25% {
    transform: translateY(-10px) rotate(-5deg);
    box-shadow: 0 0 15px rgba(65, 105, 225, 0.5);
  }
  50% {
    transform: translateY(-15px) rotate(0deg);
    box-shadow: 0 0 25px rgba(65, 105, 225, 0.7);
  }
  75% {
    transform: translateY(-10px) rotate(5deg);
    box-shadow: 0 0 15px rgba(65, 105, 225, 0.5);
  }
  100% {
    transform: translateY(0) rotate(0deg);
    box-shadow: 0 0 5px rgba(65, 105, 225, 0.3);
  }
`;

const ufoBeam = keyframes`
  0%, 100% {
    opacity: 0;
    height: 0;
  }
  50% {
    opacity: 0.7;
    height: 100px;
  }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const HeaderContainer = styled.header`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background: radial-gradient(circle at center, rgba(0, 0, 20, 0.8) 0%, rgba(0, 0, 0, 0.95) 100%);

  &::before, &::after {
    content: '';
    position: absolute;
    width: 2px;
    height: 2px;
    background: transparent;
    opacity: 0.7;
  }

  &::before {
    box-shadow: 
      1744px 122px #FFF,
      134px 1321px #FFF,
      1882px 812px #FFF,
      1703px 1537px #FFF,
      1432px 675px #FFF,
      1575px 1260px #FFF,
      1087px 1614px #FFF,
      1268px 461px #FFF,
      1034px 1726px #FFF,
      1457px 1636px #FFF,
      747px 1328px #FFF,
      1118px 1764px #FFF,
      1323px 1255px #FFF,
      244px 1268px #FFF,
      1193px 1622px #FFF,
      1313px 1653px #FFF,
      139px 1579px #FFF,
      545px 1430px #FFF,
      1731px 1076px #FFF,
      598px 1645px #FFF,
      1131px 1905px #FFF,
      1716px 1022px #FFF,
      1075px 1275px #FFF,
      1416px 897px #FFF,
      1105px 1175px #FFF,
      1478px 1208px #FFF,
      1312px 1554px #FFF,
      1794px 1042px #FFF,
      1383px 1505px #FFF,
      1497px 1300px #FFF,
      1489px 1873px #FFF,
      1437px 1075px #FFF,
      1452px 1416px #FFF,
      1775px 1473px #FFF,
      1560px 1098px #FFF,
      1316px 1216px #FFF,
      987px 1064px #FFF,
      1179px 1029px #FFF,
      1576px 1238px #FFF,
      1392px 1451px #FFF;
  }

  &::after {
    box-shadow:
      834px 589px #FFF,
      892px 934px #FFF,
      1547px 847px #FFF,
      1428px 578px #FFF,
      1824px 392px #FFF,
      1801px 1523px #FFF,
      267px 1165px #FFF,
      1034px 1163px #FFF,
      1848px 1055px #FFF,
      1371px 782px #FFF,
      1385px 1738px #FFF,
      1057px 484px #FFF,
      1751px 1410px #FFF,
      1654px 1362px #FFF,
      1161px 1213px #FFF,
      503px 1764px #FFF,
      1159px 1043px #FFF,
      1824px 1525px #FFF,
      1563px 1033px #FFF,
      77px 1455px #FFF,
      1678px 1140px #FFF,
      1589px 1465px #FFF,
      1355px 1905px #FFF,
      1859px 1015px #FFF,
      1677px 1622px #FFF,
      1594px 1912px #FFF,
      1787px 1373px #FFF,
      1633px 1633px #FFF,
      1901px 1152px #FFF,
      1517px 1784px #FFF,
      1476px 1145px #FFF,
      1789px 1154px #FFF,
      458px 1873px #FFF,
      944px 1542px #FFF,
      1043px 1843px #FFF,
      1085px 1574px #FFF,
      1290px 1655px #FFF,
      1389px 1829px #FFF,
      1789px 1598px #FFF,
      1468px 1649px #FFF,
      1017px 1823px #FFF,
      1145px 1305px #FFF,
      1898px 1227px #FFF,
      1728px 1404px #FFF,
      1228px 1090px #FFF,
      1055px 1043px #FFF,
      1337px 1427px #FFF,
      1476px 1667px #FFF,
      1596px 1659px #FFF,
      1894px 1234px #FFF;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const WelcomeMessage = styled.h1`
  font-size: 6rem;
  font-weight: 900;
  text-align: center;
  color: #fff;
  text-shadow: 0 0 10px #4169E1, 0 0 20px #4169E1, 0 0 30px #4169E1;
  margin-top: 2vh;
  animation: ${float} 6s ease-in-out infinite;
  font-family: 'Orbitron', sans-serif;
  position: relative;
  z-index: 2;
  
  &::before, &::after {
    content: '';
    position: absolute;
    width: 120%;
    height: 100%;
    top: 0;
    left: -10%;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(65, 105, 225, 0.1) 25%, 
      rgba(65, 105, 225, 0.1) 75%, 
      transparent 100%
    );
    animation: shimmer 3s linear infinite;
    transform: skewX(-20deg);
  }
  
  &::after {
    animation-delay: 1.5s;
  }
  
  @keyframes shimmer {
    0% {
      transform: translateX(-150%) skewX(-20deg);
    }
    100% {
      transform: translateX(150%) skewX(-20deg);
    }
  }
  
  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const TypewriterContainer = styled.div`
  text-align: center;
  font-family: 'Orbitron', sans-serif;
  color: #fff;
  margin-top: 1vh;
  max-width: 600px;
`;

const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2vh;
  font-size: 5rem;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  position: relative;
  z-index: 3;
  animation: ${ufoHover} 3s ease-in-out infinite;
  text-shadow: 0 0 10px #4169E1, 0 0 20px #4169E1;
  
  &:hover {
    text-shadow: 0 0 20px #4169E1, 0 0 40px #4169E1;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 0;
    background: linear-gradient(to bottom, rgba(65, 105, 225, 0.8), transparent);
    opacity: 0;
    border-radius: 50% 50% 0 0;
    z-index: -1;
    animation: ${ufoBeam} 4s ease-in-out infinite;
  }
  
  &:hover::before {
    animation: ${ufoBeam} 2s ease-in-out infinite;
  }
  
  &::after {
    content: 'Resume';
    position: absolute;
    bottom: -2rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 1.2rem;
    color: #fff;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;

const TypewriterText = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0 5px #4169E1, 0 0 10px #4169E1;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  position: relative;
  animation: 
    ${typewriter} 1.5s steps(40, end) forwards,
    ${props => props.isWaiting ? fadeOut : 'none'} 0.5s ease forwards,
    ${blink} 0.75s step-end infinite;
  border-right: 3px solid #4169E1;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Header = () => {
  const [typewriterIndex, setTypewriterIndex] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);

  const typewriterTexts = useMemo(() => [
    "Hi,",
    "I'm Bright!",
    "A Full Stack Developer",
    "A Software Engineer",
    "A Problem Solver",
    "And a Huuuge Tech Enthusiast !",
    " ", 
    "+=I'm also/*hu;mam!!, +/-* Human!",
    "Very Human!! 👽"
  ], []);

  useEffect(() => {
    let timer;
    
    const nextText = () => {
      if (typewriterIndex === typewriterTexts.length - 1) {
        // At the end of sequence, wait 3 seconds before restart
        setIsWaiting(true);
        timer = setTimeout(() => {
          setIsWaiting(false);
          setTypewriterIndex(0);
        }, 3000);
      } else {
        // For each text in sequence:
        // 1. Type out text (1.5s animation)
        // 2. Keep visible (0.5s extra)
        // Then move to next text
        timer = setTimeout(() => {
          setTypewriterIndex(prevIndex => prevIndex + 1);
        }, 2000);
      }
    };

    // Start the next text cycle if not in waiting period
    if (!isWaiting) {
      timer = setTimeout(nextText, 2000);
    }

    return () => clearTimeout(timer);
  }, [typewriterIndex, typewriterTexts.length, isWaiting]);

  return (
    <HeaderContainer>
      <ContentContainer>
        <ResumeButton href="/owusuomaribright_resume.pdf" download>
        🛸
      </ResumeButton>
        <WelcomeMessage>Welcome Into My Universe</WelcomeMessage>
        <TypewriterContainer>
          <TypewriterText key={typewriterIndex} isWaiting={isWaiting}>
            {typewriterTexts[typewriterIndex]}
          </TypewriterText>
        </TypewriterContainer>
      </ContentContainer>
    </HeaderContainer>
  );
};

export default Header;
