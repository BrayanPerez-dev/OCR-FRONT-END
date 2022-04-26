import Wave from "react-wavify";
import styled from "styled-components";

const WaveEffectOne = ({
  height = 25,
  points = 4,
  speed = 0.2,
  amplitude = 20,
  firstColor,
  secondColor,
}) => {
  return (
    <Wrapper>
      <Wave
        fill="url(#gradient)"
        options={{
          points: points,
          speed: speed,
          amplitude: amplitude,
          height: height,
        }}
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="10%" stopColor={firstColor} />
            <stop offset="90%" stopColor={secondColor} />
          </linearGradient>
        </defs>
      </Wave>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  z-index: -1;
  position: absolute;
  width: 100%;
`;

export default WaveEffectOne;
