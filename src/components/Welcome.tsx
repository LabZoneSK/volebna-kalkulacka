import Button from "./common/Button";

const Welcome = () => {
  return (
    <div>
      <section className="w-full flex items-center">
        <h1 className="font-poppins text-50 font-bold w-1/2">
          Zisti, koho voliť podľa{" "}
          <span className="text-magenta">tvojich hodnôt</span>!
        </h1>
        <img src="/images/welcome-x.png" alt="" />
      </section>

      <section className="text-center py-77 px-100 border border-light-grey rounded-cool shadow-custom-light backdrop-blur">
        <h2 className="text-center font-bold text-magenta text-34 uppercase mb-10">
          Nevyberaj ľudí, voľ hodnoty!
        </h2>
        <p className="font-poppins mb-50">
          Niekedy je veľmi ťažké vybrať si tú správnu politickú stranu. Chápeme.
          <br />
          Veríme však, že hodnoty máš celkom jasné. Práve preto sme v{" "}
          <b>Zmudri G</b>
          <br />
          pripravili <b>volebnú kalkulačku</b> pre každého mladého človeka.
        </p>
        <Button />
      </section>
    </div>
  );
};

export default Welcome;
