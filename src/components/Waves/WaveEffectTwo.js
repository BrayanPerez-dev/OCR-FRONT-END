import Wave from 'react-wavify';
import styled from 'styled-components';
import propTypes from 'prop-types';

const WaveEffectTwo = ({
	height = 20,
	points = 3,
	speed = 0.15,
	amplitude = 20,
	color,
}) => {
	return (
		<Wrapper>
			<Wave
				mask='url(#mask)'
				fill={color}
				options={{
					points,
					speed,
					amplitude,
					height,
				}}
			>
				<defs>
					<linearGradient id='gradient' gradientTransform='rotate(90)'>
						<stop offset='10%' stopColor={color} />
						<stop offset='90%' stopColor={color} />
					</linearGradient>
				</defs>
			</Wave>
		</Wrapper>
	);
};

if (process.env.NODE_ENV !== 'production') {
	WaveEffectTwo.propTypes = {
		height: propTypes.number,
		points: propTypes.number,
		speed: propTypes.number,
		amplitude: propTypes.number,
		color: propTypes.string,
	};
}
const Wrapper = styled.div`
	z-index: -2;
`;
export default WaveEffectTwo;
