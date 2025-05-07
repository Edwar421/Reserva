import HeaderStrategy from "./HeaderStrategy";
import ClienteHeaderStrategy from "./ClienteHeaderStrategy";
import NoAuthHeaderStrategy from "./NoAuthHeaderStrategy";
import LaboristaHeaderStrategy from "./LaboristaHeaderStrategy";

// Clase de contexto que gestiona la estrategia
class HeaderContext {
  private strategy: HeaderStrategy;

  constructor() {
    this.strategy = new NoAuthHeaderStrategy(); // Estrategia inicial por defecto
  }

  public setStrategy(strategy: HeaderStrategy): void {
    this.strategy = strategy;
  }

  // Método para obtener y renderizar el navbar según el tipo de usuario
  public renderNavbar(isUserAuthenticated: boolean): JSX.Element {
    const tipoCliente = localStorage.getItem("tipoUsuario");
    console.log(tipoCliente)

    if (isUserAuthenticated) {
      if (["Estudiante", "Docente", "Externo"].includes(tipoCliente || "")) {
        this.setStrategy(new ClienteHeaderStrategy());
      } else if (tipoCliente === "Laborista") {
        this.setStrategy(new LaboristaHeaderStrategy());
      } else {
        this.setStrategy(new NoAuthHeaderStrategy());
      }
    } else {
      this.setStrategy(new NoAuthHeaderStrategy());
    }

    return this.strategy.renderNavbar();
  }
}

export default HeaderContext;
