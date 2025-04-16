"use client"

export function WarrantyBadgeAlt() {
  return (
    <div className="bg-rose-50 mt-30rounded-lg shadow-md p-6 max-w-md mx-auto border border-rose-100">
      <div className="flex flex-col items-center text-center">
        <div className="relative mb-4 bg-rose-500 rounded-full p-2 w-32 h-32 flex items-center justify-center">
          <div className="bg-white rounded-full w-28 h-28 flex items-center justify-center">
            <div className="flex flex-col items-center">
              <span className="text-rose-500 text-5xl font-bold leading-none">30</span>
              <div className="bg-rose-500 text-white px-2 py-0.5 rounded text-xs font-bold mt-1">DIAS DE GARANTIA</div>
            </div>
          </div>
        </div>

        <h3 className="text-rose-500 text-xl font-bold mb-3">GARANTIA DE 30 DIAS!</h3>

        <p className="text-gray-700 text-sm">
          Não queremos você preocupada com a eficácia do nosso produto: é por isso que te damos uma garantia de 30 dias
          onde você pode pedir o nosso Coffee Dream e, caso você ache que eles não estão entregando os resultados
          desejados, você pode nos enviar um e-mail e pedir 100% do seu dinheiro de volta, sem pegadinhas ou letras
          miúdas.
        </p>

        <div className="flex mt-3">
          <span className="text-rose-400 mx-0.5">★</span>
          <span className="text-rose-400 mx-0.5">★</span>
          <span className="text-rose-400 mx-0.5">★</span>
        </div>
      </div>
    </div>
  )
}
