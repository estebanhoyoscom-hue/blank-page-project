import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import BehumanLogo from "@/components/BehumanLogo";
import { Eye, EyeOff, Check } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only - no backend logic
    console.log("Register attempt:", { name, email });
  };

  const passwordRequirements = [
    { label: "Al menos 8 caracteres", met: password.length >= 8 },
    { label: "Una letra mayúscula", met: /[A-Z]/.test(password) },
    { label: "Un número", met: /\d/.test(password) },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary/5 items-center justify-center p-12">
        <div className="max-w-md text-center space-y-8">
          <BehumanLogo size={120} className="mx-auto" />
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-foreground">behuman</h1>
            <p className="text-lg text-muted-foreground">
              Únete a miles de personas que ya están transformando su vida
            </p>
          </div>
          <div className="space-y-4 text-left bg-card/50 rounded-2xl p-6 border border-border/50">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Planes personalizados</p>
                <p className="text-sm text-muted-foreground">Rutinas adaptadas a tus objetivos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Seguimiento inteligente</p>
                <p className="text-sm text-muted-foreground">Monitorea tu progreso fácilmente</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">Comunidad activa</p>
                <p className="text-sm text-muted-foreground">Conecta con otros usuarios</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile logo */}
          <div className="lg:hidden text-center space-y-4">
            <BehumanLogo size={64} className="mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">behuman</h1>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-foreground">
              Crea tu cuenta
            </h2>
            <p className="text-muted-foreground">
              Comienza tu viaje hacia una vida más saludable
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {password && (
                <div className="space-y-2 pt-2">
                  {passwordRequirements.map((req, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        req.met ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          req.met ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        {req.met && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      {req.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                className="mt-0.5"
              />
              <Label htmlFor="terms" className="text-sm font-normal leading-relaxed cursor-pointer">
                Acepto los{" "}
                <Link to="#" className="text-primary hover:underline">
                  Términos de servicio
                </Link>{" "}
                y la{" "}
                <Link to="#" className="text-primary hover:underline">
                  Política de privacidad
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"
              disabled={!acceptTerms}
            >
              Crear cuenta
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-4 text-muted-foreground">
                ¿Ya tienes cuenta?
              </span>
            </div>
          </div>

          <Link to="/login">
            <Button
              variant="outline"
              className="w-full h-12 text-base font-medium"
            >
              Iniciar sesión
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
