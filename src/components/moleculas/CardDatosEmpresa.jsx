import styled from "styled-components";
export function CardDatosEmpresa({title,price,img}) {
  return (
    <Container>
      <div className="card">
        <div className="pricing-block-content">
          <p className="pricing-plan">{title}</p>
          <div className="price-value">
            <p className="price-number">{price}</p>
            {img && <img src={img} alt=""/>}
          </div>
        </div>
      </div>
    </Container>
  );
}
const Container = styled.div`
  z-index: 1;
  width: 100%;
  .card {
    position: relative;

    background: #fffefe;
    padding: 1rem;
    border-radius: 1rem;
    border: 0.5vmin solid #05060f;
    box-shadow: 0.4rem 0.4rem #05060f;
    overflow: hidden;
    color: black;
    .pricing-block-content {
      display: flex;
      height: 100%;
      flex-direction: column;
      gap: 0.5rem;
      .pricing-plan {
        color: #05060f;
        font-size: 1.3rem;
        line-height: 1.25;
        font-weight: 700;
      }
      .price-value {
        display: flex;
        color: #05060f;
        font-size: 1.8rem;
        line-height: 1.25;
        font-weight: 700;
        justify-content: center;
        img {
          width: 50px;
        }
      }
    }
  }
`;
{/*const Container = styled.div`
  z-index: 1;
  .card {
    width: 190px;
    background-color: #fffefe;
    padding: 1rem;
    border-radius: 1rem;
    border: 0.5vmin solid #05060f;
    box-shadow: 0.4rem 0.4rem #05060f;
    overflow: hidden;
    color: black;

    .pricing-block-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      gap: 0.5rem;

      .pricing-plan {
        color: #05060f;
        font-size: 1.3rem;
        line-height: 1.25;
        font-weight: 700;
      }

      .price-value {
        display: flex;
        color: #05060f;
        font-size: 1.8rem;
        line-height: 1.25;
        font-weight: 700;
        justify-content: center;
        .img {
          width: 50px;
        }
      }
    }
  }
`;
*/}