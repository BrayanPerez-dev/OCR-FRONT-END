import Wave from "react-wavify";
import styled from "styled-components";

const WaveEffectOne = ({ marginTop,height=20,points = 3, speed = 0.15, amplitude = 20,firstColor, secondColor }) => {
  console.log(marginTop)
  return (
    <Wrapper>
    <Wave fill="url(#gradient)" options={{ points: points, speed: speed, amplitude: amplitude,height:height }} >
      <defs >
        <linearGradient  id="gradient" gradientTransform="rotate(90)">
          <stop offset="10%" stopColor={firstColor} />
          <stop offset="90%" stopColor={secondColor} />
        </linearGradient>
      </defs>
    </Wave>
    
</Wrapper>
  );
};
const Wrapper = styled.div`
z-index: -1 ;
//position: absolute;
margin-top: -130px;
width: 100%;
`

export default WaveEffectOne;
