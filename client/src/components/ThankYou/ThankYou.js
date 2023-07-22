import { useParams, Link } from "react-router-dom";
import { styled } from "styled-components";
export default function ThankYou() {
  const { confirmationId } = useParams();

  return (
    <Wrapper>
      {!confirmationId ? (
        <Paragraph>loading...</Paragraph>
      ) : (
        <div>
          <Paragraph>Confirmation ID: {confirmationId}</Paragraph>
          <hr />
          <Paragraph>
            Thank you for ordering from Wearables! Your order will be shipped as
            soon as we have finished processing.
          </Paragraph>
          <Paragraph>
            You will receive a confirmation email from us once your item's have
            been shipped.
          </Paragraph>
          <BackToHome to="/">Back to Home</BackToHome>
        </div>
      )}
    </Wrapper>
  );
}

const BackToHome = styled(Link)`
  margin: 15px;
`;
const Wrapper = styled.div`
  padding: 3rem;
`;

const Paragraph = styled.p`
  margin: 1rem 0;
`;
