#values = String.split(input) |> Enum.map(&String.to_integer/1)
#values = String.split(input) |> Enum.map(&String.to_integer(&1))
#values = String.split(input) |> Enum.filter(& &1) |> Enum.map(&String.to_integer(&1))

defmodule Day1 do
  def solution do
    values = Path.join(["inputs", "day1.txt"])
             |> File.read!()
             |> String.split()
             |> Enum.map(fn val -> String.to_integer(val) end)
    compute_initial_fuel_requirements(values)
    |> IO.inspect
    compute_total_fuel_requirements(0, values)
    |> IO.inspect

  end
  @doc """
  iex> Day1.compute_initial_fuel_requirements([1969])
  654
  iex> Day1.compute_initial_fuel_requirements([100756])
  33583
  """
  def compute_initial_fuel_requirements(sum \\ 0, values)
  def compute_initial_fuel_requirements(sum, []), do: sum
  def compute_initial_fuel_requirements(sum, [head | tail]) do
    fuel = div(head, 3) - 2
    compute_initial_fuel_requirements(sum + fuel, tail)
  end

  def compute_total_fuel_requirements(sum, []), do: sum
  def compute_total_fuel_requirements(sum, [head | tail]) do
    fuel = div(head, 3) - 2
    additional_fuel = compute_additional_fuel(0, fuel)
    compute_total_fuel_requirements(sum + fuel + additional_fuel, tail)
  end

  def compute_additional_fuel(sum, f) when f <= 8, do: sum
  def compute_additional_fuel(sum, f) do
    fuel = div(f, 3) - 2
    compute_additional_fuel(sum + fuel, fuel)
  end
end

Day1.solution()

