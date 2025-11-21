
import React, { useState, useEffect, useMemo } from 'react';
import { CarModel, ConfigOption, OptionCategory } from './types';
import { CAR_MODELS } from './data';

// Utility for formatting currency
const formatCurrency = (value: number) => 
  new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(value);

export default function App() {
  const [selectedModelId, setSelectedModelId] = useState<string | null>(null);
  // Stores the selected option ID(s) for each category. Key = categoryId, Value = optionId | optionId[]
  const [configuration, setConfiguration] = useState<Record<string, string | string[]>>({});

  const selectedModel = useMemo(() => 
    CAR_MODELS.find(m => m.id === selectedModelId), 
  [selectedModelId]);

  // Reset configuration when model changes
  useEffect(() => {
    if (selectedModel) {
      const defaults: Record<string, string | string[]> = {};
      selectedModel.categories.forEach(cat => {
        if (cat.type === 'single') {
          // Select first option by default for required single choice categories
          if (cat.options.length > 0) {
            defaults[cat.id] = cat.options[0].id;
          }
        } else {
          // Empty array for multi-select
          defaults[cat.id] = [];
        }
      });
      setConfiguration(defaults);
    }
  }, [selectedModel]);

  const handleOptionToggle = (categoryId: string, option: ConfigOption, type: 'single' | 'multiple') => {
    if (type === 'single') {
      setConfiguration(prev => ({
        ...prev,
        [categoryId]: option.id
      }));
    } else {
      setConfiguration(prev => {
        const current = (prev[categoryId] as string[]) || [];
        const isSelected = current.includes(option.id);
        
        let newSelection;
        if (isSelected) {
          newSelection = current.filter(id => id !== option.id);
        } else {
          newSelection = [...current, option.id];
        }

        return {
          ...prev,
          [categoryId]: newSelection
        };
      });
    }
  };

  // Flatten selected option IDs to check rules easily
  const allSelectedOptionIds = useMemo(() => {
    return Object.values(configuration).flat();
  }, [configuration]);

  // Calculate totals and validation
  const { totalPrice, totalOptionsPrice, warnings } = useMemo(() => {
    let optPrice = 0;
    const warn: string[] = [];
    if (!selectedModel) return { totalPrice: 0, totalOptionsPrice: 0, warnings: [] };

    selectedModel.categories.forEach(cat => {
      const selectedIds = Array.isArray(configuration[cat.id]) 
        ? configuration[cat.id] as string[] 
        : [configuration[cat.id] as string];

      selectedIds.forEach(selId => {
        if (!selId) return;
        const opt = cat.options.find(o => o.id === selId);
        if (!opt) return;

        // Rule: check 'includedIn'
        const isIncluded = opt.includedIn?.some(pkgCode => {
           // Need to find the option ID associated with this pkgCode across all categories
           const pkgOption = selectedModel.categories
             .flatMap(c => c.options)
             .find(o => o.code === pkgCode);
           return pkgOption && allSelectedOptionIds.includes(pkgOption.id);
        });

        if (!isIncluded) {
          optPrice += opt.price;
        }

        // Rule: check 'requires'
        if (opt.requires) {
          const missingReq = opt.requires.filter(reqCode => {
             const reqOption = selectedModel.categories
               .flatMap(c => c.options)
               .find(o => o.code === reqCode);
             return !reqOption || !allSelectedOptionIds.includes(reqOption.id);
          });
          if (missingReq.length > 0) {
             warn.push(`"${opt.name}" requires: ${missingReq.join(', ')}`);
          }
        }

        // Rule: check 'incompatibleWith'
        if (opt.incompatibleWith) {
          const conflicts = opt.incompatibleWith.filter(badCode => {
             const badOption = selectedModel.categories
               .flatMap(c => c.options)
               .find(o => o.code === badCode);
             return badOption && allSelectedOptionIds.includes(badOption.id);
          });
          if (conflicts.length > 0) {
            warn.push(`"${opt.name}" is incompatible with: ${conflicts.join(', ')}`);
          }
        }
      });
    });

    return { 
      totalPrice: selectedModel.baseMsrp + optPrice, 
      totalOptionsPrice: optPrice,
      warnings: warn
    };
  }, [selectedModel, configuration, allSelectedOptionIds]);

  const handlePrint = () => {
    window.print();
  };

  if (!selectedModel) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 md:p-12">
        <header className="mb-12 text-center">
          <div className="flex items-center justify-center mb-4">
             <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
               <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
               <path d="M7 11h10v2H7z"/>
             </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">MINI Internal Order Request</h1>
          <p className="text-gray-600">Select a vehicle to begin configuration</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {CAR_MODELS.map(model => (
            <button
              key={model.id}
              onClick={() => setSelectedModelId(model.id)}
              className="group flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden text-left"
            >
              <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                {/* Placeholder for car image */}
                <div className="text-gray-400 font-bold text-xl tracking-widest opacity-20 group-hover:opacity-30 transition-opacity">
                  {model.id}
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{model.name}</h3>
                <p className="text-sm text-gray-500 mb-4 min-h-[40px]">{model.description}</p>
                <div className="flex justify-between items-end">
                   <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Base MSRP</span>
                   <span className="text-lg font-bold">{formatCurrency(model.baseMsrp)}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-black text-white px-6 py-4 sticky top-0 z-30 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setSelectedModelId(null)}
            className="text-gray-400 hover:text-white flex items-center transition-colors"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            Back
          </button>
          <h1 className="text-lg font-bold truncate hidden md:block">{selectedModel.name}</h1>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400 uppercase tracking-wider">Total MSRP</div>
          <div className="text-xl font-bold text-white">{formatCurrency(totalPrice)}</div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto w-full p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Configuration Area */}
        <div className="lg:col-span-8 space-y-8 pb-24">
          
          {/* Model Header Mobile Only */}
          <div className="lg:hidden mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{selectedModel.name}</h2>
            <p className="text-gray-600">{selectedModel.description}</p>
          </div>

          {selectedModel.categories.map((category) => (
            <section key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="font-bold text-lg text-gray-900">{category.title}</h3>
              </div>
              <div className="p-6 space-y-4">
                {category.options.map((option) => {
                  const isSelected = Array.isArray(configuration[category.id])
                    ? (configuration[category.id] as string[]).includes(option.id)
                    : configuration[category.id] === option.id;

                  // Check if included in another package
                  const includedInPackage = option.includedIn?.find(pkgCode => {
                     const pkgOption = selectedModel.categories.flatMap(c => c.options).find(o => o.code === pkgCode);
                     return pkgOption && allSelectedOptionIds.includes(pkgOption.id);
                  });

                  // Render logic
                  return (
                    <label 
                      key={option.id} 
                      className={`
                        relative flex items-start p-4 rounded-lg border cursor-pointer transition-all
                        ${includedInPackage ? 'bg-gray-50 border-gray-200 opacity-80' : ''}
                        ${isSelected && !includedInPackage ? 'border-black bg-gray-50 ring-1 ring-black' : 'border-gray-200 hover:border-gray-300'}
                      `}
                    >
                      <input
                        type={category.type === 'single' ? 'radio' : 'checkbox'}
                        name={category.id}
                        checked={isSelected}
                        onChange={() => !includedInPackage && handleOptionToggle(category.id, option, category.type)}
                        className="mt-1 h-4 w-4 text-black border-gray-300 focus:ring-black"
                        disabled={!!includedInPackage}
                      />
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <span className="font-semibold text-gray-900">
                            {option.code && <span className="text-gray-500 font-mono text-xs mr-2">[{option.code}]</span>}
                            {option.name}
                          </span>
                          <span className="font-medium text-gray-900">
                            {includedInPackage ? (
                              <span className="text-green-600 text-sm">Included in {includedInPackage}</span>
                            ) : (
                              option.price === 0 ? 'Included' : formatCurrency(option.price)
                            )}
                          </span>
                        </div>
                        {option.description && (
                          <p className="text-sm text-gray-500 mt-1">{option.description}</p>
                        )}
                        {/* Requirements Hint */}
                        {!isSelected && option.requires && (
                           <div className="text-xs text-amber-600 mt-2">
                             Requires: {option.requires.join(', ')}
                           </div>
                        )}
                        {/* Incompatible Hint */}
                        {!isSelected && option.incompatibleWith && (
                           <div className="text-xs text-red-500 mt-1">
                             Incompatible with: {option.incompatibleWith.join(', ')}
                           </div>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
             <div className="bg-gray-900 text-white px-6 py-4">
               <h3 className="font-bold text-lg">Your Configuration</h3>
             </div>
             <div className="p-6 space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto">
                <div className="flex justify-between text-sm">
                   <span className="text-gray-600">Base MSRP</span>
                   <span className="font-semibold">{formatCurrency(selectedModel.baseMsrp)}</span>
                </div>
                <div className="flex justify-between text-sm pb-4 border-b border-gray-100">
                   <span className="text-gray-600">Options Total</span>
                   <span className="font-semibold">{formatCurrency(totalOptionsPrice)}</span>
                </div>
                
                {/* Selected Options List */}
                <div className="space-y-2">
                  {selectedModel.categories.map(cat => {
                     const selectedIds = Array.isArray(configuration[cat.id]) ? configuration[cat.id] : [configuration[cat.id]];
                     // Filter out empty selections
                     const validIds = (selectedIds as string[]).filter(Boolean);
                     
                     if (validIds.length === 0) return null;

                     return (
                       <div key={cat.id}>
                         <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 mt-3">{cat.title}</div>
                         {validIds.map(id => {
                           const opt = cat.options.find(o => o.id === id);
                           if (!opt) return null;
                           return (
                             <div key={id} className="flex justify-between text-sm mb-1">
                               <span className="text-gray-800">{opt.name}</span>
                               {/* Hide price if included in another package, or if 0 */}
                               {opt.price > 0 && (
                                 <span className="text-gray-500">{formatCurrency(opt.price)}</span>
                               )}
                             </div>
                           );
                         })}
                       </div>
                     );
                  })}
                </div>

                {/* Validation Warnings */}
                {warnings.length > 0 && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded text-xs text-red-700 space-y-1">
                    <strong>Conflicts found:</strong>
                    {warnings.map((w, i) => <div key={i}>• {w}</div>)}
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200 mt-4">
                   <div className="flex justify-between items-center mb-1">
                     <span className="font-bold text-gray-900">Total MSRP</span>
                     <span className="font-bold text-xl text-gray-900">{formatCurrency(totalPrice)}</span>
                   </div>
                   <div className="flex justify-between items-center text-yellow-600 text-sm font-semibold">
                     <span>Est. Lease (Example)</span>
                     <span>{formatCurrency(totalPrice * 0.004 + (totalPrice * 0.004 * 0.13) /* Dummy formula based on user provided example range */)}/mo</span>
                   </div>
                   <div className="text-[10px] text-gray-400 mt-1 text-right">*Pricing subject to change.</div>
                </div>
             </div>
             <div className="p-4 bg-gray-50 border-t border-gray-200">
               <button 
                 className={`w-full py-3 px-4 rounded-lg font-bold shadow-sm transition-all
                   ${warnings.length > 0 
                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                     : 'bg-yellow-400 hover:bg-yellow-500 text-black'}`}
                 disabled={warnings.length > 0}
                 onClick={handlePrint}
               >
                 Submit Order Request
               </button>
             </div>
          </div>
        </div>

      </main>
    </div>
  );
}
